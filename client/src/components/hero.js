import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./hero.css";

class Hero extends Component {

  render () {
    return (
      <div className="hero text-center" style={{ backgroundImage: `url(${this.props.backgroundImage})` }}>
        {this.props.children}
        <Link to="/Login">
          <button className="hero-button btn btn-light">Create a Guestbook</button>
        </Link>
      </div>
    );
  }

}


  
  export default Hero;
