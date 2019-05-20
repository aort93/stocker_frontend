import React from 'react'
import StockPage from './StockPage'
import CompanyInfo from './CompanyInfo'
import { connect } from 'react-redux'

class CompanyPage extends React.Component {
  state = {
    currData: {
      symbol: null
    }
  }

  componentDidMount() {
    this.props.setStock(this.props.match.params.ticker)
    fetch(`http://localhost:3000/companies/${this.props.match.params.ticker
    }`)
    .then(r => r.json())
    .then(data => {
      const currData = {...data}
      this.setState({
        currData: currData
      })
    })

    // fetch(`http://localhost:3000/companies/${this.props.match.params.ticker
    // }`)

  }

  render() {
    return(
      <div>
        <StockPage />
        <CompanyInfo currData={this.state.currData} />
      </div>
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
    }}

    }

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage);
