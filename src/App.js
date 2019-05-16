import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import ProfilePage from './ProfilePage'
import NavBar from './NavBar'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'

import { connect } from 'react-redux'

class App extends React.Component {

  // state = {
  //   homeArticles: [],
  //   page: 'home',
  //   currentUser: null
  // }

  logOut = () => {
		localStorage.removeItem("token")
		this.props.setUser(null)
		this.props.history.push("/login")
	}

  updateUser = (updatedUser) => {
		this.setState({
			currentUser: updatedUser
		})
	}


  componentDidMount () {
    fetch('http://localhost:3000/home_articles')
    .then( r => r.json() )
    .then( data => {
        console.log(data)
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
				<NavBar currentUser={this.props.currentUser} logOut={this.logOut}/>
				<Grid.Row centered>
					<Switch>
            <Route path="/profile" render={(routeProps) => {
              return <ProfilePage {...routeProps} updateUser={this.updateUser} currentUser={this.props.currentUser} />
            }} />
						<Route path="/login" render={(routeProps) => {
							return <LoginPage {...routeProps} setCurrentUser={this.setCurrentUser}/>
						}} />
						<Route path="/signup" render={(routeProps) => {
							return <SignUpPage {...routeProps} setCurrentUser={this.setCurrentUser}/>
						}} />
					</Switch>
				</Grid.Row>
			</Grid>

        <p>{this.props.homeArticles[0] ? this.props.homeArticles[0]['headline'] : null}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
