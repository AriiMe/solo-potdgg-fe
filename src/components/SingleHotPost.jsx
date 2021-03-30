import React from "react";
import { Container, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { BiLike, BiCommentDetail, BiShare, BiSend } from "react-icons/bi";
import { MdReport } from "react-icons/md";
import moment from "moment";

import EditPost from "./EditPost";

export default class SingleHotPost extends React.Component {
  state = {
    likes: 0,
    isliked: false,
    comments: [],
    errorMessege: false,
  };
  getComments = async () => {
    try {
      let response = await fetch(
        "https://potd-lol.herokuapp.com/potd/comments/",
        {
          credentials: "include",
        }
      );
      console.log(response);
      if (response.ok) {
        let comments = await response.json();

        this.setState({ comments });
      } else {
        this.setState({ errorMessage: true });
      }
    } catch (e) {
      this.setState({ errorMessage: true });
    }
  };
  handleDelete = async (e) => {
    let id = e.currentTarget.id;
    try {
      let response = await fetch(
        `https://potd-lol.herokuapp.com/potd/comments/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        let filteredComments = this.state.comments.filter(
          (comment) => comment.id !== id
        );
        this.setState({
          comments: filteredComments,

          deletedSize: this.state.deletedSize + 1,
        });
      } else {
        alert("something went wrong :(");
      }
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: true });
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
  handleLike = async () => {
    try {
      const result = await fetch(
        `https://potd-lol.herokuapp.com/potd/like/${this.props.me.id}/${this.props.post.id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const response = await result.json();
      console.log(response);
      await this.fetchLikes();
    } catch (error) {
      await this.fetchLikes();
      console.log(error);
    }
  };
  componentDidMount = async () => {
    console.log(this.props.me);
    await this.fetchLikes();
    await this.getComments();
  };

  render() {
    const { post, fetchPost, me } = this.props;
    console.log("me", me);
    return (
      <Card
        data-aos="zoom-in-up"
        data-aos-offset="500"
        data-aos-duration="5000"
        border="dark"
        className="w-100 my-4"
        key={`feed${post.id}`}
        style={{ borerRadius: "0px !important" }}
        loading="lazy"
        bg="dark"
      >
        <Card.Header className="d-flex justify-content-between px-3">
          <div>
            <a href="/users/:id">
              <img
                src={post.user.imgurl}
                className="postModalImg mr-3"
                style={{ borderRadius: "100px", width: "50px" }}
              />
            </a>
            <strong className="ml-2">{post.user.username}</strong>
          </div>
          <h1 className="text-center">{post.title}</h1>
          {me.id === post.userId && (
            <EditPost post={post} refetch={() => fetchPost()} me={me} />
          )}
          <MdReport style={{ fontSize: "40px" }} />
        </Card.Header>
        {post.imgurl && (
          <video controls interval={null} muted src={post.imgurl} />
        )}
        <span style={{ padding: "10px" }} className="text-muted text-right">
          {moment(post.createdAt).fromNow()}
        </span>
        <p className="text-left ml-5" style={{ overflow: "hidden" }}>
          {post.description}
        </p>
        <Card.Text className="p-3">{post.text}</Card.Text>

        <Card.Footer className="HomeModal bg-white">
          <Row>
            <Col xs={6} sm={6} lg={8} xl={10}>
              <Button
                variant={
                  !this.state.isLiked
                    ? "outline-dark mx-1"
                    : "outline-warning mx-1"
                }
                onClick={() => this.handleLike()}
              >
                <BiLike /> Like {this.state.likes}
              </Button>
              <Button variant="outline-dark mx-1">
                <BiCommentDetail /> Comment
              </Button>
            </Col>

            <Col className="mr-1">
              <Button variant="outline-dark mx-1">
                <BiShare /> Share
              </Button>
              <Button variant="outline-dark mx-1">
                <BiSend /> Send
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    );
  }
}
