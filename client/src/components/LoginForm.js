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
        <div id="login-form-container" className="col-md-5">
          <form>
            <h3 className="text-center">Sign In</h3>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="Email"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <div id="buttonDiv">
              <button type="button" className="btn btn-dark btn-block" onClick={this.handleFormSubmit}>Login</button>
            </div>
          </form>
        </div>

      );
    }
  }
    
  export default LoginForm;
