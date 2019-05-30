import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'
import { Container, Grid, Button} from "semantic-ui-react"




class StockChart extends React.Component {
  state = {
    chart: {},
    stock: {},
    data: [],
    date: []
  }

  componentDidMount() {
    this.props.setStock(this.props.match.params.ticker)
    let date = []
    let close = []
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.match.params.ticker}/chart/1m`)
      .then(res => res.json())
      .then(data => {
        this.props.setData(data.map(chart => chart.close))
        this.props.setDate(data.map(chart => chart.label))
          data.map(p => {
              close.push(p.close)
              date.push(p.date)
              return 'done'
          })
          this.setState({
              data: close,
              date: date
          })
      })
      this.setState({
        data: [],
        date: []
      })
  }

  getData = (time, search, title) => {
    let close = []
    let date = []

    fetch(`https://api.iextrading.com/1.0/stock/${this.props.currentStock}/chart/${time}`)
      .then(res => res.json())
      .then(data => {
        this.props.setData(data.map(chart => chart.close))
        this.props.setDate(data.map(chart => chart.label))
          data.map(p => {
              close.push(p.close)
              time === "1d" ? date.push(p.minute) : date.push(p.date)
              return 'done'
          })
          this.setState({
              data: close,
              date: date
          })
      })
      this.setState({
        data: [],
        date: []
      })
  }


    oneDay = () => {
        this.getData("1d", this.props.stockInfo.currentStock, "one day")
    }

    oneMonth = () => {
        this.getData("1m", this.props.stockInfo.currentStock, "one month")
    }

    threeMonth = () => {
        this.getData("3m", this.props.stockInfo.currentStock, "three month")
    }

    sixMonth = () => {
        this.getData("6m", this.props.stockInfo.currentStock, "six month")
    }

    oneYear = () => {
        this.getData("1y", this.props.stockInfo.currentStock, "one year")
    }

    twoYear = () => {
        this.getData("2y", this.props.stockInfo.currentStock, "two year")
    }


    fiveYear = () => {
        this.getData("5y", this.props.stockInfo.currentStock, "five year")
    }

    buttonWatch = () => {
      let date = new Date()
      fetch("http://localhost:3000/watch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
  				"Accepts": "application/json"
        },
        body: JSON.stringify({
          date: date,
          symbol: this.props.stockInfo.currentStock,
          userId: this.props.currentUser.id,
        })
      })
      .then(r => r.json())
      .then( r =>
        console.log(r)
      )
    }


  render() {
    console.log(this.props)
    return (
      <Container>
        <br/><br/>
        <Grid><img src={this.props.stockInfo.logo.url}/> <h1>{this.props.stockInfo.company.company_name}</h1></Grid>
        <br/>
        {this.props.currentStock ? <Button inverted color='teal' onClick={this.oneDay}>1 Day</Button> : null}
        {this.props.currentStock ? <Button inverted color='teal' onClick={this.oneMonth}>1 Month</Button> : null}
        {this.props.currentStock ? <Button inverted color='teal' onClick={this.threeMonth}>3 Months</Button > : null}
        {this.props.currentStock ? <Button inverted color='teal' onClick={this.sixMonth}>6 Months</Button> : null}
        {this.props.currentStock ? <Button inverted color='teal' onClick={this.oneYear}>1 Year</Button> : null}
        {this.props.currentStock ? <Button inverted color='teal' onClick={this.twoYear}>2 Year</Button> : null}
        {this.props.currentStock ? <Button inverted color='teal' onClick={this.fiveYear}>5 Year</Button> : null}

        <button onClick={this.buttonWatch}>Toggle Watch</button>
        <div style={{position:"relative", width:'100%', height: '50%' }} >
                {this.props.currentStock ?
                  <Line ref="chart" data={{
                    labels: this.props.date,
                    datasets: [{
                        label: "hi",
                        backgroundColor: "rgba(75,192,192,0.4)",
                        data: this.props.data,
                        lineTension: 0.0,
                        fill: false,
                        borderColor: "rgba(75,192,192,1)",
                        pointHoverRadius: 2,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 0,
                        pointHitRadius: 2
                    }]}
                  } /> : <div className="ping">...</div>}
            </div>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentStock: state.currentStock,
    stockInfo: state.stockInfo,
    date: state.date,
    data: state.data,
    title: state.title
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setData: (data) => {
      dispatch({
        type: "SET_DATA",
        payload: data
      })
    },
    setDate: (date) => {
      dispatch({
        type: "SET_DATE",
        payload: date
      })
    },
    setTitle: (stock) => {
      dispatch({
        type: "SET_TITLE",
        payload: stock
      })
    },
    setStock: (stock) => {
      dispatch({
        type: "SET_CURRENT_STOCK",
        payload: stock
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StockChart));
