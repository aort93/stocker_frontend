import React from 'react'

class MyWatchList extends React.Component {
  render() {
    return (
      <div>
      { this.props.stock ?
        <React.Fragment>
          <h3>Watched Stocks </h3>
          <p>{this.props.stock.name} - {this.props.stock.symbol}</p>
        </React.Fragment>
        : null}
      </div>
    )
  }
}

export default MyWatchList
