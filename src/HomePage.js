import React from 'react'
import HomeArticle from './HomeArticle'
import MyStocks from './MyStocks'
import MyWatchList from './MyWatchList'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2'





class HomePage extends React.Component {

  state = {
        data: {}
  }

    componentDidMount(){
      let high = []
      let low = []
      let symbol = []
      fetch('https://api.iextrading.com/1.0/stock/market/list/mostactive')
      .then(res => res.json())
      .then(data => {
      data.forEach(s => {
                  high.push(s.high)
                  low.push(s.low)
                  symbol.push(s.symbol)
              })

        this.setState({
            data: {
              labels: [...symbol],
                datasets: [{
                label: "Market Low",
                backgroundColor: "rgba(255, 0, 255, 0.75)",
                data: [...low]
                },
                {
                label: "Market High",
                backgroundColor: "rgba(0, 255, 0, 0.75)",
                data: [...high]
                }]}
        })
      })
    }


  renderArticles = () => {
    return this.props.homeArticles.map(article => {
      return <HomeArticle article={article}/>
    })
  }

  renderWatchedStocks = () => {
    return this.props.currentUser.watched_stocks.map(stock => {
      return <MyWatchList stock={stock}/>
    })
  }

  renderMyStocks = () => {
    return this.props.currentUser.stocks.map(stock => {
      return <MyStocks stock={stock} />
    })
  }


  render() {
    console.log(this.props.currentUser)
    return (
      <div>
        <div>
          <h1>Home Page</h1>
          <Bar ref="chart" data={this.state.data} style={{width:'50%', heigth:'50%', display:'flex'}}/>
          {this.renderArticles()}
        </div>

        <div>
          {this.props.currentUser ? this.renderMyStocks() : null}
          {this.props.currentUser ? this.renderWatchedStocks() : null}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    homeArticles: state.homeArticles,
    currentUser: state.currentUser,
    currentStock: state.currentStock
  }
}

export default connect(mapStateToProps)(HomePage);
