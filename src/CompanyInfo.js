import React from 'react'
import { connect } from 'react-redux'
// import HomeArticle from './HomeArticle'

class CompanyInfo extends React.Component {



  render() {
    // console.log(this.props.companyInfo)
    return (
      <div>
        {this.props.companyInfo.company ?
          <div>
            <h1>Company Info</h1>
            <img src={this.props.companyInfo.logo.url} alt={`Image Logo for ${this.props.companyInfo.company.company_name} not available`}/>
            <p>{this.props.companyInfo.currentStock}</p>
            <p>{this.props.companyInfo.company.company_name}</p>
            <p>{this.props.companyInfo.company.primary_exchange}</p>


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
    currentStock: state.currentStock,
    companyInfo: state.stockInfo
  }
}

export default connect(mapStateToProps)(CompanyInfo);
