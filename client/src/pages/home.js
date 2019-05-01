import React, { Component } from "react";
import Hero from "../components/hero";

class home extends Component {

    render() {
        return (
          <div>
            <Hero backgroundImage="https://images.pexels.com/photos/724644/pexels-photo-724644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
                <h1>Modern Guestbook</h1>
            </Hero>
            <div>
              <h4>How It Works</h4>
              <ol>
                <li>You create a guestbook</li>
                <li>Your guests scan a QR code to get your guestbook</li>
                <li>Your guests updload a picture and heartfelt message for you</li>
              </ol>
            </div>
          </div>
    
        );
      }
}

export default home;