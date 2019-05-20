import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class StockList extends React.Component {

  // clickedStock = () => {
  //   // const infoStock = localStorage.getItem("stock")
  //   // if(infoStock) {
  //   //   localStorage.removeItem("stock")
  //   //   const symbol = this.props.setStock(this.props.stock.symbol)
  //   //   localStorage.setItem("stock", symbol)
  //   // } else {
  //   //   this.props.setStock(this.props.stock.symbol)
  //   // }
  //   history.push
  // }


  render() {
      console.log(this.props.currentStock)
    return (
      <React.Fragment>
        <tr>
          <td>{this.props.stock.name}</td>
          <td>{this.props.stock.price_at_purchase}</td>
          <td>{this.props.stock.shares}</td>
          <td>{this.props.stock.total_day_bought}</td>
          <td>
          <Link to={`/companies/${this.props.stock.symbol}`}>
          <button>
                Info
              </button>
          </Link>
          </td>
        </tr>
      </React.Fragment>
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
    setStock: (stockSymbol) => {
      dispatch({
        type: "SELECT_STOCK",
        payload: stockSymbol
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList);
