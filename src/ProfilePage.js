import React from 'react'
import { connect } from 'react-redux'
import StockPage from './StockPage'
import StockList from './StockList'
import { v4 } from 'uuid'


class ProfilePage extends React.Component {

  renderStocks = () => {
    return this.props.currentUser.stocks.map(stock => {
      return <StockList key={ v4() } stock={stock}/>
    })
  }

  renderTableData = () => {
    let sumObj = {};

    this.props.currentUser.stocks.forEach( stock => {
      if (sumObj[stock.symbol]) {
        sumObj[stock.symbol] += parseFloat(stock.price_at_purchase * stock.current_shares)
      } else {
        sumObj[stock.symbol] = parseFloat(stock.price_at_purchase *stock.current_shares)
      }


    })

    console.log(sumObj)
    return 'hi'
  }



  render() {
    console.log(this.props)
    return (
      <div>
        <StockPage />
        { this.renderTableData() }
        {this.props.currentUser ?
          <div>
            <h1>{ this.props.currentUser.username }</h1>
            <h1>{ `${this.props.currentUser.first_name} ${this.props.currentUser.last_name}`}</h1>
            <h1>{this.props.currentUser.stocks_value + this.props.currentUser.cash_value}</h1>
            <table>
              <thead>
              <tr>
                <th>Stock Company</th>
                <th>Stock Symbol</th>
                <th>Price at Purchase</th>
                <th>Shares</th>
                <th>Total</th>
                </tr>
              </thead>
            <tbody>
            { this.renderStocks() }
            </tbody>
            </table>
          </div>
          : null}
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

export default connect(mapStateToProps)(ProfilePage);
