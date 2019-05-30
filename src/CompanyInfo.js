import React from 'react'
import { connect } from 'react-redux'
import CompanyArticles from './CompanyArticles'
import { Grid } from 'semantic-ui-react'
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
    console.log(this.props)
    return (
      <div>
      <br/>
      <h1>STATISTICS</h1>
          <Grid>
            <Grid.Column width={6}>
            <p>COMPANY: {this.props.companyInfo.company.company_name}</p>
            <p>SYMBOL: {this.props.companyInfo.currentStock.toUpperCase()}</p>
            <p>EXCHANGE: {this.props.companyInfo.company.primary_exchange}</p>
            <p>SECTOR: {this.props.companyInfo.company.sector} </p>
            </Grid.Column>
            <Grid.Column width={6}>
            <p>VOLUME: {this.props.companyInfo.company.avg_total_volume}</p>
            <p>OPEN: {this.props.companyInfo.company.open}</p>
            <p>CLOSE: {this.props.companyInfo.company.close}</p>
            <p>PREV CLOSE: {this.props.companyInfo.company.previous_close}</p>
            <p>LATEST PRICE: {this.props.companyInfo.company.latest_price}</p>
            <p>HIGH: {this.props.companyInfo.company.high}</p>
            <p>LOW: {this.props.companyInfo.company.low}</p>
            <p>52 WEEK RANGE: {this.props.companyInfo.company.week52_low} - {this.props.companyInfo.company.week52_high}</p>
            <p>P/E RATIO: {this.props.companyInfo.company.pe_ratio}</p>
            </Grid.Column>
            </Grid>
            <h3>{this.props.companyInfo.company.company_name}'s Articles For The Day</h3>
            { this.renderArticles() }




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
