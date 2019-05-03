import React, { Component } from "react";
import "./guestInputStyle.css";
import List from "../components/List";
import ListItem from "../components/ListItem";
import EventCreateForm from "../components/EventCreateForm"
import { Link } from "react-router-dom";
import Nav from "../components/navbar"
const axios = require('axios');


class Events extends Component {

    state = {
        events: []
      };

    componentDidMount() {
        this.loadEvents();
    }
    
    loadEvents = () => {
        let id = localStorage.getItem("userID")
        axios.get("/api/events/" + id)
            .then(function (response) {
            // handle success
            this.setState({ events: response.data});
            console.log(JSON.stringify(response));
        }.bind(this))
    };

    render() {
        return (
          <div>
            <Nav />
            <div className="container text-center">
              <EventCreateForm />
              <h3>Your Guestbooks</h3>
              <List>
                  {this.state.events.map(event => (
                      <ListItem key={event.id}>
                      <Link to={"/GuestBook/" + event.id}>
                          <strong>
                          {event.eventName}
                          </strong>
                      </Link>
                      {event.eventDate}
                      </ListItem>
                  ))}
              </List>
          </div>   
          </div> 
        );
      }
}

export default Events;