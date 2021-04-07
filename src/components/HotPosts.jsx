/** @format */

import React, { Component } from "react";
import { Container, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { BiLike, BiCommentDetail, BiShare, BiSend } from "react-icons/bi";
import "./styles/Home.css";
import SingleHotPost from "./SingleHotPost";
import HotPostText from "./HotPostText";

export default class HotPosts extends Component {
  state = {
    likes: [],
    posts: [],
    me: {},
    showAlert: null,
    err: false,
    errType: null,
    errMsg: "",
    loading: true,
  };
  fetchPost = async () => {
    try {
      const response = await fetch(
        "https://potd-lol.herokuapp.com/potd/posts/hotPosts",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        let postResponse = await response.json();
        console.log(postResponse);
        postResponse = postResponse.reverse().slice(0, 50);
        this.setState({ posts: postResponse, loading: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        err: true,
        errType: "danger",
        errMsg: error.messasge,
      });
    }
  };
  fetchLikes = async () => {
    try {
      const result = await fetch(
        `https://potd-lol.herokuapp.com/potd/like/${this.props.me.id}/${this.props.post.id}/likes`,
        {
          credentials: "include",
        }
      );
      const response = await result.json();
      console.log(response);
      this.setState({ likes: response.total, isLiked: response.isLiked });
    } catch (error) {
      console.log(error);
    }
  };
  sortLikes = () => {
    this.setState({
      likes: this.state.likes.sort((a, b) => {
        return b - a;
      }),
    });
  };
  fetchMe = async () => {
    try {
      const meFetch = await fetch(
        "https://potd-lol.herokuapp.com/potd/users/me",
        {
          credentials: "include",
        }
      );
      const meResponse = await meFetch.json();
      console.log(meResponse);
      this.setState({ me: meResponse });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchMe();
    this.sortLikes();
    this.fetchPost();
  }
  render() {
    console.log(
      this.state.likes
        .sort((a, b) => {
          return a - b;
        })
        .reverse()
    );
    this.state.posts.length > 0
      ? console.log("render", this.state.posts[0].user.imgurl)
      : console.log(" ");
    return (
      <div className="homeDiv mt-5">
        <Container className="HomeCont" style={{ maxWidth: "5000px" }}>
          <HotPostText />
          {this.state.err && (
            <Alert variant="danger">{this.state.errMsg}</Alert>
          )}
          {this.state.loading && this.state.err !== true ? (
            <div
              style={{ position: "relative", top: "8vh", left: "25vw" }}
              className="lds-facebook"
            ></div>
          ) : Object.keys(this.state.posts).length !== 0 ? (
            <Row>
              <Col className="d-none d-lg-block" lg={3}>
                {/* <AppNavBar me={this.state.me} />
                  <RSidebar me={this.state.me} /> */}
              </Col>
              <Col lg={6} md={9}>
                {this.state.posts.length > 0 &&
                  this.state.posts
                    .sort((a, b) => b.likes.length - a.likes.length)
                    .map((post) => (
                      <SingleHotPost
                        post={post}
                        fetchPost={() => this.fetchPost()}
                        me={this.state.me}
                      />
                    ))}
              </Col>
              <Col className="d-none d-md-block" md={3}>
                {/* <Sidebar /> */}
              </Col>
            </Row>
          ) : (
            <div></div>
          )}
        </Container>
      </div>
    );
  }
}
