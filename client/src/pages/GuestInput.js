import React, { Component } from "react";
import API from "../utils/API";
import $ from 'jquery';
import "./guestInputStyle.css";
import { Redirect } from "react-router-dom";


class GuestInput extends Component {

  state = {
    message: "",
    from: "",
    image_url: "",
    to_confirm: ""
  };

  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

  onChange = e => {

    const files = Array.from(e.target.files)
    // this.setState({ uploading: true })

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })

    fetch(`/api/pic`, {
      method: 'POST',
      body: formData
    })
    .then(function(response) {
        console.log(response);
      });
  }



  handleFormSubmit = event => {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/message",
      data: {
        message: this.state.message,
        EventId: "1"
      }
    }).done(function (data) {
      this.setState({
        toHome: true
      })
      // alert("Your message has been added to the guestbook");
    }.bind(this))
  };

  render() {
    if (this.state.toHome === true) {
      return <Redirect to='/Confirm' />
    }
    return (
      <div className="container">
        <div>
          <h2>Sign our guestbook</h2>
          <h5>Leave us a message, a memory, some advice, or anything you feel like! Don't forget to add a picture. You can take a new pic or find one of your favorites to post along with a memory.</h5>
        </div>
        <div>
          <textarea 
            className="form-control" 
            rows="3"
            type="text"
            placeholder="Write your message..."
            name="message"
            value={this.state.message}
            onChange={this.handleInputChange}
          />
          <input 
              className="image-input"
              id="single" 
              type="file" 
              accept="image/*"
              // value={this.state.image_url}
              // onChange={props.onChange}
              onChange={this.onChange}
          />
          <div>
            <button type="button" className="btn btn-primary btn-block"onClick={this.handleFormSubmit}>Submit</button>
          </div>
        </div>
      </div>

    );
  }

}

export default GuestInput;