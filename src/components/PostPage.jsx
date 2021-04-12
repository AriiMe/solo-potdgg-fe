/** @format */

import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Form,
  Image,
  ListGroup,
} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./styles/PostPage.css";
import CommentFile from "./CommentFile";

function PostPage(props) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const [postData, setPostdata] = useState({});

  const fetchPost = async () => {
    try {
      const response = await fetch(
        "https://potd-lol.herokuapp.com/potd/posts/" + props.match.params.id,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        let postResponse = await response.json();
        console.log("aaaaaabaget", postResponse);
        setPostdata(postResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async (e) => {
    e.preventDefault()
    console.log(comment)
    try {
      let response = await fetch(
        "https://potd-lol.herokuapp.com/potd/comments/" + props.match.params.id,
        {
          method: "POST",
          body: JSON.stringify({text: comment}),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setComment('')
        fetchPost()
      }
      let resp = await response.json();

      console.log(resp)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
 
    <Container>
    <h1 className="text-center">{postData.title}</h1>
      <div id="videoPlayer">
        <video controls interval={null} muted src={postData.imgurl} />
      </div>
      <div id="commentArea" className="mt-5">
      <p className="text-center">{postData.description}</p>
        <Form onSubmit={(e) => postComment(e)}>
          <Form.Group  controlId="exampleForm.ControlTextarea1">
            <Form.Control
              onChange={(e) => setComment(e.currentTarget.value)}
              as="textarea"
              rows={3}
              placeholder='Leave a Comment'
              value={comment}
            />
          </Form.Group>
          <button className="w-full my-3" type="submit">
            Comment
          </button>
        </Form> 
  {postData.hasOwnProperty('comments') && <CommentFile postData={postData}/>}
       
      </div>
    </Container>
  );
}

export default withRouter(PostPage);
