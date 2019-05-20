import React from 'react'
import { connect } from 'react-redux'
import HomeArticle from './HomeArticle'

class CompanyInfo extends React.Component {


  render() {
    console.log(this.props.currData)
    return (
      <div>
        <h1>Company Info</h1>
        <p>{this.props.currData.symbol}</p>
        <p>{this.props.currData.company_name}</p>

        <div>

        </div>
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

export default connect(mapStateToProps)(CompanyInfo);
