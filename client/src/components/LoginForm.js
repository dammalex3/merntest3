import React, { Component } from "react";
import "./LoginForm.css";
import $ from 'jquery';
import { Redirect } from "react-router-dom";
const axios = require('axios');

class LoginForm extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
      username: "",
      password: "",
      toHome: false
    };
  
    // handle any changes to the input fields
    handleInputChange = event => {
      // Pull the name and value properties off of the event.target (the element which triggered the event)
      const { name, value } = event.target;
  
      // Set the state for the appropriate input field
      this.setState({
        [name]: value
      });
    };
  
    // When the form is submitted, prevent the default event and alert the username and password
    handleFormSubmit = event => {
      event.preventDefault();
      console.log(this.state.username);
      console.log(this.state.password);
      $.ajax({
        method: "POST",
        url: "/api/users/login",
        data: {
          userName: this.state.username,
          passWord: this.state.password
        }
      }).done(function (response) {
        console.log(response);
        if (response === false) {
            alert('Username or Password were incorrect, please try again')
            $("#username-input").val("")
            $("#pw-input").val("")
        } else {
            localStorage.setItem("userID", response);
            this.setState({
                toHome: true
            })
        }
      }.bind(this))
    };
  
    render() {
        if (this.state.toHome === true) {
            return <Redirect to='/Events' />
          }
      return (
        <form>
          <p>Username: {this.state.username}</p>
          <p>Password: {this.state.password}</p>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      );
    }
  }
    
  export default LoginForm;
