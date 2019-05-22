import React from 'react'
import { connect } from 'react-redux'
import { Doughnut } from 'react-chartjs-2';

class StockPage extends React.Component {

  state = {
    currentNetStockValue: {},
    currentCashValue: {}
  }


  componentDidMount () {
    console.log(this.props.currentUser)
    fetch(`http://localhost:3000/user/${this.props.currentUser.id}/stock_val`, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({user_id: this.props.currentUser})
    })
    .then(r => r.json())
    .then(data => {
      console.log(data)
      this.props.setTransaction(data)
      this.setState({
        currentNetStockValue: {labels: [
      		"cash", "stocks"
      	],
      	datasets: [{
      		data: [data.current_cash, data.total_stock_investment],
      		backgroundColor: [
      		'#FF6384',
      		'#36A2EB'
      		],
      		hoverBackgroundColor: [
      		'#FF6384',
      		'#36A2EB'
      		]
      	}]},
        currentCashValue:{labels: [
      		"cash", "stocks"
      	],
      	datasets: [{
      		data: [data.current_cash, data.total_stock_investment],
      		backgroundColor: [
      		'#FF6384',
      		'#36A2EB'
      		],
      		hoverBackgroundColor: [
      		'#FF6384',
      		'#36A2EB'
      		]
      	}]}
      })
    })
  }




  render() {
    console.log(this.props)
    return (
      <div>
          <div style={{width:'50%', heigth:'50%',display:'flex'}}>
            <h2>Current Cash Pie Chart</h2>
            <Doughnut data={this.state.currentNetStockValue} options={{
            responsive: true,
            maintainAspectRatio: true,
            }}/>
          </div>
          <div style={{width:'50%', heigth:'50%',display:'flex'}}>
            <h2>Current Cash Pie Chart</h2>
            <Doughnut data={this.state.currentCashValue} options={{
            responsive: true,
            maintainAspectRatio: true,
            }}/>
          </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    homeArticles: state.homeArticles,
    currentUser: state.currentUser,
    userTransaction: state.userTransaction

  }
}

function mapDispatchToProps(dispatch) {
  return {
    setTransaction: (userTransaction) => {
      dispatch({
        type: "GET_TRANSACTION",
        payload: userTransaction
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockPage);
