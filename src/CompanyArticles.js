import React from 'react'


class CompanyArticles extends React.Component {
  render() {
    return (
      <div>
      <a target="_blank" href={this.props.article.url}>{this.props.article.headline}</a>
      <p> Date: {this.props.article.datetime}</p>
      <p> Summary: {this.props.article.summary}</p>
      <br />
      </div>
    )
  }
}

export default CompanyArticles
