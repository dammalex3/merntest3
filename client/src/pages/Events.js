import React, { Component } from "react";
import "./guestInputStyle.css";
import List from "../components/List";
import ListItem from "../components/ListItem";
import { Link } from "react-router-dom";
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
          <div className="container">
            <div>
              <h2>View your events</h2>
            </div>
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
    
        );
      }
}

export default Events;