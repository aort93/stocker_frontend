import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import ProfilePage from './ProfilePage'
import NavBar from './NavBar'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import HomePage from './HomePage'

import { connect } from 'react-redux'

class App extends React.Component {

  logOut = () => {
		localStorage.removeItem("token")
		this.props.setUser(null)
		this.props.history.push("/")
	}

  // updateUser = (updatedUser) => this.props.setUSer: updatedUser


  componentDidMount () {
    fetch('http://localhost:3000/home_articles')
    .then( r => r.json() )
    .then( data => {
        this.props.setArticles(data)
    })

    const token = localStorage.getItem("token")

		if (token){
			fetch("http://localhost:3000/auto_login", {
				headers: {
					"Authorization": token
				}
			})
			.then(res => res.json())
			.then((response) => {
				if (response.errors) {
					alert(response.errors)
				} else {
          console.log(response)
					this.props.setUser(response)
				}
			})
		}
  }



  render() {
    console.log(this.props)
    return (
      <div >
      <Grid>
				<NavBar logOut={this.logOut}/>
					<Switch>
            <Route path="/profile" render={(routeProps) => {
              return <ProfilePage {...routeProps} />
            }} />
						<Route path="/login" render={(routeProps) => {
							return <LoginPage {...routeProps}/>
						}} />
						<Route path="/signup" render={(routeProps) => {
							return <SignUpPage {...routeProps}/>
						}} />
            <Route path="/" render={(routeProps) => {
              return <HomePage {...routeProps} />
            }} />
					</Switch>
			</Grid>
      </div>
  )};
}

function mapStateToProps(state) {
  return {
    homeArticles: state.homeArticles,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setArticles: (homeArticles) => {
      dispatch({
        type: "SET_HOME_ARTICLES",
        payload: homeArticles
      })
    },
    setUser: (user) => {
      dispatch({
        type: "SET_USER",
        payload: user
      })
    }}

    }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
