import React from 'react'
import { connect } from 'react-redux'
import { Line } from "react-chartjs-2";



const dateData = [
  "2014-05-12",
  "2014-05-13",
  "2014-05-14",
  "2014-05-15",
  "2014-05-19",
  "2014-05-20",
  "2014-05-21"
];
const myVolume = [
  53324674,
  39934592,
  47428583,
  56813940,
  47933075,
  43033925,
  58991505
];

const data = {
  labels: [...dateData],
  datasets: [
    {
      label: "Apple First 7 Day Volume",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [...myVolume]
    }
  ]
};


class StockPage extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>Line Example</h2>
          <Line ref="chart" data={data} />
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
