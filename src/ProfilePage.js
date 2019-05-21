import React from 'react'
import { connect } from 'react-redux'
import StockPage from './StockPage'
import StockList from './StockList'


class ProfilePage extends React.Component {

  renderStocks = () => {
    return this.props.currentUser.stocks.map(stock => {
      return <StockList stock={stock}/>
    })
  }

  render() {
    return (
      <div>
        <StockPage />
        {this.props.currentUser ?
          <div>
            <h1>{ this.props.currentUser.username }</h1>
            <h1>{ `${this.props.currentUser.first_name} ${this.props.currentUser.last_name}`}</h1>
            <h1>{this.props.currentUser.stocks_value}</h1>
            <table>
            <tr>
              <th>Stock Compnay</th>
              <th>Price at Purchase</th>
              <th>Shares</th>
              <th>Total</th>
            </tr>
            { this.renderStocks() }
            </table>
          </div>
          : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(ProfilePage);
