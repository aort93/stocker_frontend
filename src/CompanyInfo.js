import React from 'react'
import { connect } from 'react-redux'
import HomeArticle from './HomeArticle'

class CompanyInfo extends React.Component {

  render() {
    console.log(this.props.currData)
    return (
      <div>
        {this.props.currData.company ?
          <div>
            <h1>Company Info</h1>
            <img src={this.props.currData.logo.url} />
            <p>{this.props.currData.company.symbol}</p>
            <p>{this.props.currData.company.company_name}</p>
            <p>{this.props.currData.company.primary_exchange}</p>


          </div>
          :
          null
        }

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
