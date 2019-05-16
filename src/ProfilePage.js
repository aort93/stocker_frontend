import React from 'react'
import { connect } from 'react-redux'
import StockPage from './StockPage'

class ProfilePage extends React.Component {

  render() {
    return (
      <div>
        <StockPage />
        {this.props.currentUser ? <h1>{ this.props.currentUser.username }</h1> : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(ProfilePage);
