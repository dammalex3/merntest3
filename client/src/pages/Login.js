import React, { Component } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Nav from "../components/navbar"
import "./LoginPage.css"

class Login extends Component {
    render() {
        return (
          <div>
              <Nav />
              <div className="form-cont">
                <LoginForm />
                <SignupForm />
              </div>

          </div>
    
        );
      }
}

export default Login;