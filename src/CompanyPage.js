import React from 'react'
import CompanyInfo from './CompanyInfo'
import { connect } from 'react-redux'
import StockChart from './StockChart'
import TradeComponent from './TradeComponent'

class CompanyPage extends React.Component {
  componentDidMount() {
    this.props.setStock(this.props.match.params.ticker)
    this.props.setCurrentSymbol(this.props.match.params.ticker)
    fetch(`http://localhost:3000/companies/${this.props.match.params.ticker}`)
    .then(r => r.json())
    .then(data => {
      this.props.setCurrentCompany(data.company)
      this.props.setCurrentArticle(data.company_news)
      this.props.setLogo(data.logo)
    })
}



  render() {
    // console.log("company container", this.props)
    return(
      <div>
        <StockChart />
        <CompanyInfo />
        <TradeComponent />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentStock: state.currentStock,
    stockInfo: state.stockInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setArticles: (homeArticles) => {
      dispatch({
        type: "SET_HOME_ARTICLES",
        payload: homeArticles
      })
    },
    setUser: (user) => {
      dispatch({
        type: "SET_USER",
        payload: user
      })
    },
    setStock: (stockSymbol) => {
      dispatch({
        type: "SELECT_STOCK",
        payload: stockSymbol
      })
    },
    setCurrentSymbol: (symbol) => {
      dispatch({type: "SET_CURRENT_STOCK", payload: symbol})
    },
    setCurrentCompany: (company) => {
      dispatch({type: "SET_COMPANY_INFO", payload: company})
    },
    setCurrentArticle: (article) => {
      dispatch({type: "SET_ARTICLE_INFO", payload: article})
    },
    setLogo: (logo) => {
      dispatch({type: "SET_LOGO", payload: logo})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage);
