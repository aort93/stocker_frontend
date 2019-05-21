import React from 'react'


class StockChart extends React.Component {

  getData = (time, search, title) => {
        let close = []
        let date = []
        fetch(`https://api.iextrading.com/1.0/stock/${search}/quote`)
            .then(res => res.json())
            .then(stock => this.setState({
                stock: stock
            }))
        fetch(`https://api.iextrading.com/1.0/stock/${search}/chart/${time}`)
            .then(res => res.json())
            .then(data => {
                data.map(p => {
                    close.push(p.close)
                    time === "1d" ? date.push(p.minute) : date.push(p.date)
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
  render() {
    return (
      <div>
        <h1>Chart Goes Here</h1>
      </div>
    )
  }
}


export default StockChart
