import React from 'react'
import { connect } from 'react-redux'
import { Line } from "react-chartjs-2";
import { Doughnut } from 'react-chartjs-2';

class StockPage extends React.Component {

  state = {
    currentNetStockValue: {},
    currentCashValue: {}
  }


  componentDidMount () {
    fetch("http://localhost:3000/user/stock_val")
    .then(r => r.json())
    .then(data => {
      this.setState({
        currentNetStockValue: {labels: [
      		"cash", "stocks"
      	],
      	datasets: [{
      		data: [data.current_cash, data.buying_power - data.total_stock_investment],
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
    // console.log(this.state.currentNetStockValue)
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
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps)(StockPage);
