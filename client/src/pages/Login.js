import React, { Component } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import "./LoginPage.css"

class Login extends Component {
    render() {
        return (
          <div>
              <div>
                <LoginForm />
              </div>
              <div>
                <SignupForm />
              </div>
          </div>
    
        );
      }
}

export default Login;