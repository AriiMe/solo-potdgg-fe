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
        {/* <Row>
          <Col md={8}>
            <h1>Comment Section</h1>
            {comments.length === 0 ? (
              <h1 variant="info">
                No Comments <Link to="/">Go Back</Link>
              </h1>
            ) : (
              <ListGroup variant="flush">
                {comments.map((post) => (
                  <ListGroup.Item key={post.id}>
                    <Row>
                      <Col md={2}>
                        <Image src={post.image} alt={post.name} fluid rounded />
                      </Col>
                      <Col md={3}>{post.comment}</Col>
                      <Col md={2}></Col>
                      <Col md={3}></Col>
                      <Col md={1}></Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({comments.reduce((acc, item) => acc + item.qty, 0)})</h2>
                            ${comments.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                variant='success'
                                disabled={comments.length === 0}
                                onClick={checkoutHandler}
                            >
                                Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
          </Col>
        </Row> */}
      </div>
    </Container>
  );
}

export default withRouter(PostPage);
