import React from 'react'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'




class StockChart extends React.Component {

  state = {
    chart: {},
    stock: {},
    data: [],
    date: []
  }

  getData = (time, search, title) => {
        let close = []
        let date = []

        fetch(`https://api.iextrading.com/1.0/stock/${this.props.currentStock}/chart/${time}`)
            .then(res => res.json())
            .then(data => {
                data.map(p => {
                    close.push(p.close)
                    time === "1d" ? date.push(p.minute) : date.push(p.date)
                    return
                })
                this.setState({
                    data: close,
                    date: date
                })
            })
            .then(() => {
                this.setState({
                    chart: {
                        labels: this.state.date,
                        datasets: [{
                            label: title,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            data: this.state.data,
                            lineTension: 0.0,
                            fill: false,
                            borderColor: "rgba(75,192,192,1)",
                            pointHoverRadius: 2,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 0,
                            pointHitRadius: 2
                        }]
                    }
                })
            })
        this.setState({
            search: "",
            data: [],
            date: []
        })
    }


    oneDay = () => {
        this.getData("1d", this.state.currentStock, "one day")
    }

    oneMonth = () => {
        this.getData("1m", this.state.currentStock, "one month")
    }

    threeMonth = () => {
        this.getData("3m", this.state.currentStock, "three month")
    }

    sixMonth = () => {
        this.getData("6m", this.state.currentStock, "six month")
    }

    oneYear = () => {
        this.getData("1y", this.state.currentStock, "one year")
    }

    twoYear = () => {
        this.getData("2y", this.state.currentStock, "two year")
    }


    fiveYear = () => {
        this.getData("5y", this.state.currentStock, "five year")
    }
  render() {
    console.log(this.props.currentStock)
    return (
      <div>
        <h1>Chart Goes Here</h1>
        {this.props.currentStock ? <button onClick={this.oneDay}>1 Day</button> : null}
        {this.props.currentStock ? <button onClick={this.oneMonth}>1 Month</button> : null}
        {this.props.currentStock ? <button onClick={this.threeMonth}>3 Months</button> : null}
        {this.props.currentStock ? <button onClick={this.sixMonth}>6 Months</button> : null}
        {this.props.currentStock ? <button onClick={this.oneYear}>1 Year</button> : null}
        {this.props.currentStock ? <button onClick={this.twoYear}>2 Year</button> : null}
        {this.props.currentStock ? <button onClick={this.fiveYear}>5 Year</button> : null}
        <div style={{position:"relative", width:1300, height: 1000 }} >
                {this.props.currentStock ? <Line ref="chart" data={this.state.chart} /> : <div className="ping">...</div>}
            </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentStock: state.currentStock,
    userTransaction: state.userTransaction
  }
}
export default connect(mapStateToProps)(StockChart);
