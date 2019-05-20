import React from 'react'
import { connect } from 'react-redux'

class MyStocks extends React.Component {
  render() {
    return (
      <div>
      { this.props.currentUser ?
        <React.Fragment>
          <h3>Invested Stocks </h3>
          <p>{this.props.stock.name} - ${this.props.stock.price_at_purchase} - {this.props.stock.shares}</p>
        </React.Fragment>
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


export default connect(mapStateToProps)(MyStocks);
