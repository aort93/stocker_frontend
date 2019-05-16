import React from 'react'

class HomeArticle extends React.Component {
  render() {
    return (
      <div>
          <a href={this.props.article.link}>{this.props.article.headline}</a>
          <p>Date: {this.props.article.date}</p>
          <p>Summary: {this.props.article.summary}</p>
          <br />
      </div>
    )
  }
}

export default HomeArticle
