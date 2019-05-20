import React from 'react'
import { Grid, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class NavBar extends React.Component {

  render() {
    return (
      <Grid.Row>

      					<Menu>
      						{this.props.currentUser
      							?
      							<Menu.Menu position="right">
                      <Link className="item" to={`/`}>
                        Stocker
                      </Link>
      								<Link className="item" to={`/profile/${this.props.currentUser.id}`}>
      									{this.props.currentUser.username}
      								</Link>
      								<Menu.Item onClick={this.props.logOut}>
      									Log out
      								</Menu.Item>
      							</Menu.Menu>
      							:
      							<Menu.Menu position="right">
      								<Link className="item" to="/login">
      									Login
      								</Link>
      								<Link className="item" to="/signup">
      									Sign Up
      								</Link>
      							</Menu.Menu>
      						}
      					</Menu>
      				
      			</Grid.Row>
      		)

  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(NavBar)
