/** @format */

import React from "react";
import { Container, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { BiLike, BiCommentDetail, BiShare, BiSend } from "react-icons/bi";
import { MdReport } from "react-icons/md";
import moment from "moment";
import { withRouter } from "react-router-dom";
import hitmarkersound from "../logo/hitmarkersound.mp3";
import hitmarker from "../logo/hitmarker.png";
import { FacebookIcon, RedditIcon, TwitterIcon } from "react-share";

import EditPost from "./EditPost";

class SinglePost extends React.Component {
  state = {
    likes: [],
    isliked: false,
    comments: [],
    errorMessege: false,
    showHitMarker: false,
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
    await this.fetchLikes();
    await this.getComments();
  };
  componentDidUpdate = async (prevProps) => {
    if (prevProps.me !== this.props.me) {
      await this.fetchLikes();
    }
  };

  start = () => {
    let audio = new Audio(hitmarkersound);
    audio.play();
  };

  render() {
    const { post, fetchPost, me } = this.props;
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
            <img
              onClick={() => this.props.history.push("/users/" + post.user.id)}
              src={post.user.imgurl}
              className="postModalImg mr-3"
              style={{ borderRadius: "100px", width: "50px", height: "50px" }}
            />
            <strong className="ml-2">{post.user.username}</strong>
          </div>
          <h1 className="text-center">{post.title}</h1>
          <div className="d-flex align-items-center">
            {" "}
            {me.id === post.userId && (
              <EditPost post={post} refetch={() => fetchPost()} me={me} />
            )}
            <MdReport style={{ fontSize: "40px" }} />
          </div>
        </Card.Header>
        {post.imgurl && (
          <video
            loading="lazy"
            controls
            interval={null}
            muted
            src={post.imgurl}
          />
        )}
        <span style={{ padding: "10px" }} className="text-muted text-right">
          {moment(post.createdAt).fromNow()}
        </span>
        <p className="text-left ml-5" style={{ overflow: "hidden" }}>
          {post.description}
        </p>
        <Card.Text className="p-3">{post.text}</Card.Text>

        <Card.Footer className="HomeModal">
          <Row className="d-flex justify-content-between">
            <Col style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                {this.state.showHitMarker && (
                  <img id="hitmarker" src={hitmarker} />
                )}
                <Button
                  variant={
                    !this.state.isLiked
                      ? "outline-dark mx-1"
                      : "outline-warning mx-1"
                  }
                  onClick={() => {
                    this.handleLike();
                    this.start();
                    this.setState({ showHitMarker: true });
                    setTimeout(() => {
                      this.setState({ showHitMarker: false });
                    }, 500);
                  }}
                >
                  <BiLike /> Like {this.state.likes}
                </Button>
                <Button
                  variant="outline-dark mx-1"
                  onClick={() => this.props.history.push("/posts/" + post.id)}
                >
                  <BiCommentDetail /> Comment
                </Button>
              </div>

              <div className="d-flex">
                {" "}
                <FacebookIcon size={32} round={true} />
                <RedditIcon size={32} round={true} />
                <TwitterIcon size={32} round={true} />
              </div>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    );
  }
}
export default withRouter(SinglePost);
