import React from 'react'
import { Form, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'


class SignUpPage extends React.Component {
  state = {
    first_name: "",
    last_name: "",
		username: "",
    cash:"",
		password: "",
		passwordConfirmation: "",
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

  createUser = () => {
		fetch("http://localhost:3000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then((response) => {
			if (response.errors){
				alert(response.errors)
			} else {
			  this.props.setUser(response.user)
        localStorage.setItem("token", response.token)
  			this.props.history.push(`/profile/${response.user.username}`)
			}
		})
	}

	handleSubmit = () => {
		if(this.state.password === this.state.passwordConfirmation && this.state.cash > 200){
			this.createUser()
		} else {
			alert("Passwords don't match! or not enough money(less than 200)")
		}
	}

  render(){
    console.log(this.state)
		return (
			<Form onSubmit={this.handleSubmit}>
      <Form.Field>
        <label>First Name</label>
        <input onChange={this.handleChange} name="first_name" value={this.state.first_name} placeholder='first name' />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input onChange={this.handleChange} name="last_name" value={this.state.last_name} placeholder='last name' />
      </Form.Field>
		    <Form.Field>
		      <label>Username</label>
		      <input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
		    </Form.Field>
        <Form.Field>
		      <label>Amount to Start Trading With:</label>
		      <input onChange={this.handleChange} name="cash" type="number" value={this.state.cash} placeholder='$Cash' />
		    </Form.Field>
		    <Form.Field>
		      <label>Password</label>
		      <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
		    </Form.Field>
		    <Form.Field>
		      <label>Password Confirmation</label>
		      <input onChange={this.handleChange} type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} placeholder='Password Confirmation' />
		    </Form.Field>
		    <Button type='submit'>Submit</Button>
		  </Form>
		)
	}
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => {
      dispatch({
        type: "SET_USER",
        payload: user
      })
    }}
}

export default connect(null, mapDispatchToProps)(SignUpPage)
