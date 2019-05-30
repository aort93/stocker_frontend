import React from 'react'
import { Container } from 'semantic-ui-react'


class HomeArticle extends React.Component {

  render() {
    // console.log(this.props)
    return (
      <Container text>
          <a target="_blank" href={this.props.article.link}>{this.props.article.headline}</a>
          <p>Date: {this.props.article.date}</p>
          <p>Summary: {this.props.article.summary}</p>
          <br />
      </Container>
    )
  }
}

export default HomeArticle
