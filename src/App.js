import React from 'react';
import './App.css';
import { Switch, Link, Route, withRouter } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import symbol from './stocksymbols'

import ProfilePage from './ProfilePage'
import Autocomplete from './Autocomplete'
import NavBar from './NavBar'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import HomePage from './HomePage'
import CompanyPage from './CompanyPage'

import { connect } from 'react-redux'

class App extends React.Component {

  logOut = () => {
		localStorage.removeItem("token")
		this.props.setUser(null)
		this.props.history.push("/")
	}

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
					this.props.setUser(response)
				}
			})
		}
  }



  render() {
    return (
      <div >
      <Grid>
				<NavBar logOut={this.logOut}/>
        <Autocomplete
              suggestions={
                symbol.map(symbol => {
                  return `${symbol.symbol} - ${symbol.name}`
                })
              }
            />
				<Switch>
          {this.props.currentUser ? <Route path= {`/profile/${this.props.currentUser.username}`} render={(routeProps) => {
            return <ProfilePage {...routeProps} />
          }} /> : null}
					<Route path= "/login" render={(routeProps) => {
						return <LoginPage {...routeProps}/>
					}} />
					<Route path= "/signup" render={(routeProps) => {
						return <SignUpPage {...routeProps}/>
					}} />
          <Route path= {`/companies/:ticker`} render={(routeProps) => {
            return <CompanyPage {...routeProps} currentStock={routeProps.match.params.ticker} />
          }} />
          <Route path= "/" render={(routeProps) => {
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
    currentUser: state.currentUser,
    currentStock: state.currentSelectedStock
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
    setStock: (stockSymbol) => {
      dispatch({
        type: "SELECT_STOCK",
        payload: stockSymbol
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
