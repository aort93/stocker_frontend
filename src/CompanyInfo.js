import React from 'react'
import { connect } from 'react-redux'
import CompanyArticles from './CompanyArticles'
import v4 from 'uuid'

class CompanyInfo extends React.Component {

  renderArticles = () => {
    if (this.props.companyInfo.article.news){
      return this.props.companyInfo.article.news.map( article => {
        return <CompanyArticles key={v4()} article={article} />
      })
    }
  }

  render() {
    // console.log(this.props.companyInfo)
    return (
      <div>
        {this.props.companyInfo.company ?
          <div>
            <h1>Stats</h1>
            <p>{this.props.companyInfo.currentStock}</p>
            <p>{this.props.companyInfo.company.company_name}</p>
            <p>{this.props.companyInfo.company.primary_exchange}</p>

            <h3>{this.props.companyInfo.company.company_name}'s Artciles For The Day</h3>
            { this.renderArticles() }


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
