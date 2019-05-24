import React from 'react'
import { connect } from 'react-redux'


class TradeComponent extends React.Component {

  state = {
    shares: 1
  }

  handleChange = (e) => {
    this.setState({
      shares: e.target.value
    })
  }

  amountSharesOwned = () => {
    let count = 0;


    this.props.currentUser.stocks.forEach( stock => {
      if(stock.symbol === this.props.stockInfo.currentStock) {
        return count += stock.current_shares
      }
    })

    return count;
  }

  funds = () => {
    return this.props.currentUser.cash_value
  }

  buyStocks = () => {
    let date = new Date()
    fetch("http://localhost:3000/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
				"Accepts": "application/json"
      },
      body: JSON.stringify({
        date: date,
        symbol: this.props.stockInfo.currentStock,
        userId: this.props.currentUser.id,
        shares: this.state.shares
      })
    })
    .then(r => r.json())
    .then(r => {
      if (r.errors) {
        alert(r.errors)
        this.props.buyStocks(this.props.currentUser)
      } else {
        this.props.buyStocks(r)
      }
      this.setState({
        shares: 1
      })
    })

  }

  sellStocks = () => {
    let date = new Date()
    fetch("http://localhost:3000/sell", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
				"Accepts": "application/json"
      },
      body: JSON.stringify({
        date: date,
        symbol: this.props.stockInfo.currentStock,
        userId: this.props.currentUser.id,
        shares: this.state.shares
      })
    })
    .then(r => r.json())
    .then(r => {
      if (r.errors) {
        alert(r.errors)
        this.props.buyStocks(this.props.currentUser)
      } else {
        this.props.buyStocks(r)
      }
      this.setState({
        shares: 1
      })
    })
  }
  render() {
    // console.log(this.props.currentUser)
    return (
      <div>
      {this.props.currentUser ?
        <div>
          <h1>Trading!!!</h1>
          <p>{this.props.stockInfo.currentStock}</p>

          <p>Number of shares you own: {this.amountSharesOwned()}</p>

          <p>Current Value: {this.props.stockInfo ? this.props.stockInfo.company.latest_price:null}</p>


          <p>How many shares do you wanna buy/sell?</p>
          <input onChange={this.handleChange} type="number" name="number" value={this.state.shares} />
          <br/>

          <button onClick={this.buyStocks}>Buy</button>
          <button onClick={this.sellStocks}>Sell</button>

          <p>Funds Avavilbale: {this.funds()}</p>
        </div>
        : null
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentStock: state.currentStock,
    stockInfo: state.stockInfo,
    userTransaction: state.userTransaction
  }
}


function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => {
      dispatch({
        type: "SET_USER",
        payload: user
      })
    },
    setStock: (stockSymbol) => {
      dispatch({
        type: "SELECT_STOCK",
        payload: stockSymbol
      })
    },
    buyStocks: (stock) => {
      dispatch({
        type: "BUY_STOCK",
        payload: stock
      })
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TradeComponent)
