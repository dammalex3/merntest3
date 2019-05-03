import React, { Component } from "react";
import "./guestInputStyle.css";
import PostCard from "../components/PostCard";
import Nav from "../components/navbar"


const axios = require('axios');

class GuestBook extends Component {

    state = {
        posts: []
      };

    componentDidMount() {
        this.loadPosts();
    }
    
    loadPosts = () => {

        axios.get('/api/posts')
            .then(function (response) {
            // handle success
            this.setState({ posts: response.data});
            console.log(response);
        }.bind(this))
    };

    render() {
        return (
          <div>
            <Nav />
            <div className="container">
              <div>
                <h2>View your guestbook</h2>
                <h5>On this page you can view all of the messages that your guests left you in you Guest Book!</h5>
              </div>
              {this.state.posts.map(post => (
                  <PostCard
                      key = {post.id}
                      image_url={post.picture_url}
                      message={post.message}
                  />
              ))}
            </div>
          </div>
        );
      }
}

export default GuestBook;