import React, { Component } from "react";
import "./LoginForm.css";
import $ from 'jquery';
import { Redirect } from "react-router-dom";

class SignupForm extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
      firstName: "",
      lastName: "",
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
      console.log(this.state.password);
      $.ajax({
        method: "POST",
        url: "/api/users/create",
        data: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          userName: this.state.username,
          passWord: this.state.password
        }
      }).done(function (response) {
        console.log(response);
        if (response === false) {
            alert('There was an issue creating your account, please try again')
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
        <div id="form-container" className="col-md-5">
          <h3 className="text-center">Create an Account</h3>
          <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
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

          <button type="button" className="btn btn-dark btn-block" onClick={this.handleFormSubmit}>Sign Up</button>
        </form>
        </div>
        
      );
    }
  }
    
  export default SignupForm;
