import React, { Component } from "react";
import $ from 'jquery';
import { Redirect } from "react-router-dom";

class EventCreateForm extends Component {
    // Setting the initial values of this.state.username and this.state.password
    state = {
      eventName: "",
      eventDate: "",
      eventMessage: "",
      eventType: "",
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
        url: "/api/event",
        data: {
          eventName: this.state.eventName,
          eventDate: this.state.eventDate,
          eventMessage: this.state.eventMessage,
          eventType: this.state.eventType,
          UserId: localStorage.getItem('userID')
        }
      }).done(function (response) {
        console.log(response);
        if (response === false) {
            alert('There was an issue creating your event, please try again')
            $("#username-input").val("")
            $("#pw-input").val("")
        } else {
          alert("Successfully created your new guestbook");
          window.location.reload();
        }
      }.bind(this))
    };
  
    render() {
      return (
        <div id="form-container" className="col-md-8">
          <h3 className="text-center">Create a New Guestbook</h3>
          <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Event Name"
              name="eventName"
              value={this.state.eventName}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Event Date"
              name="eventDate"
              value={this.state.eventDate}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Message to your guests"
              name="eventMessage"
              value={this.state.eventMessage}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
              type="test"
              className="form-control"
              placeholder="Event Type"
              name="eventType"
              value={this.state.eventType}
              onChange={this.handleInputChange}
            />
          </div>

          <button type="button" className="btn btn-dark btn-block" onClick={this.handleFormSubmit}>Sign Up</button>
        </form>
        </div>
        
      );
    }
  }
    
  export default EventCreateForm;
