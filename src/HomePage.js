import React from 'react'
import HomeArticle from './HomeArticle'
import MyStocks from './MyStocks'
import MyWatchList from './MyWatchList'
import { connect } from 'react-redux'





class HomePage extends React.Component {

  renderArticles = () => {
    return this.props.homeArticles.map(article => {
      return <HomeArticle article={article}/>
    })
  }


  render() {
    return (
      <div>
        <div>
          <h1>Home Page</h1>
          {this.renderArticles()}
        </div>

        <div>
          <MyStocks />
          <MyWatchList />
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

export default connect(mapStateToProps)(HomePage);
