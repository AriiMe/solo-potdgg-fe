/** @format */

import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Card, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./styles/PostPage.css";
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
    try {
      let response = await fetch(
        "https://potd-lol.herokuapp.com/potd/comments/" + props.match.params.id,
        {
          method: "POST",
          body: JSON.stringify({
            text: setComment(),
          }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let resp = await response.json();
      await postComment(resp.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <Container>
      <div id="videoPlayer">
        <video controls interval={null} muted src={postData.imgurl} />
      </div>
      <div id="commentArea" className="mt-5">
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Leave a Comment</Form.Label>
            <Form.Control
              onChange={(e) => setComment(e.currentTarget.value)}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <button className="w-full my-3" type="submit">
            Comment
          </button>
        </Form>
      </div>
    </Container>
  );
}

export default withRouter(PostPage);
