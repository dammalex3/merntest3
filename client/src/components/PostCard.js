import React from "react";
import "./PostCard.css";

function PostCard(props) {
  return (
    <div className="card">
        <img className="card-img-top" src={props.image_url} alt=""/>
        <div className="card-body">
        <p className="card-text">{props.message}</p>
        </div>
    </div>

  );
}

export default PostCard;
