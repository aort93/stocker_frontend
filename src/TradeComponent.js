import React from 'react'
import { connect } from 'react-redux'


class TradeComponent extends React.Component {

  amountSharesOwned = () => {
    let count = 0;
    this.props.currentUser.stocks.forEach( stock => {
      if(stock.symbol === this.props.currentStock) {
        return count += stock.shares
      }
    })
    return count;
  }



  render() {
    console.log(this.props.currentUser)
    return (
      <div>
      {this.props.currentUser ?
        <div>
          <h1>Trading!!!</h1>
          <p>{this.props.currentStock}</p>

          <p>Number of shares you own: {this.amountSharesOwned()}</p>

          <p>Current Value: {this.props.currData.company ? this.props.currData.company.latest_price:null}</p>


          <p>How many shares do you wanna buy/sell?</p>
          <input type="text" amount="number" />

          <button>Buy</button>
          <button>Sell</button>

          <p>Funds Avavilbale: </p>
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
    currentStock: state.currentStock
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
    }}

    }

export default connect(mapStateToProps, mapDispatchToProps)(TradeComponent)
