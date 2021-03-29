/** @format */

import React from "react";
import { Button, Col, Row, Modal, Form } from "react-bootstrap";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IconContext } from "react-icons";

class EditPost extends React.Component {
  state = {
    showModal: false,
    content: [],
    post: {},
    selectedFile: null,
    imgSubmitStatus: "secondary",
  };

  onChangeHandler = (e) => {
    this.setState({
      content: {
        ...this.state.content,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };

  Edit = async () => {
    try {
      const response = await fetch(
        `https://potd-lol.herokuapp.com/potd/posts/${this.props.post.id}`,
        {
          method: "PUT",
          body: JSON.stringify(this.state.content),
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
        }
      );
      if (response.ok) {
        this.state.selectedFile !== null
          ? this.fileUploadHandler()
          : this.setState({ showModal: false }, () => this.props.refetch());
      } else {
        this.setState({ showModal: false });
      }
      this.props.refetch();
    } catch (e) {
      console.log(e);
    }
  };

  Delete = async () => {
    try {
      const response = await fetch(
        `https://potd-lol.herokuapp.com/potd/posts/${this.props.post.id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        this.setState({ showModal: false });
        this.props.refetch();
      } else {
        this.setState({ showModal: false });
      }
    } catch (e) {
      console.log(e);
    }
  };
  fileSelectHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      imgSubmitStatus: "success",
    });
  };

  fileUploadHandler = async () => {
    const fd = new FormData();
    fd.append("post", this.state.selectedFile);
    try {
      const response = await fetch(
        `https://potd-lol.herokuapp.com/potd/posts/${this.props.post.id}`,
        {
          method: "POST",
          credentials: "include",
          body: fd,
        }
      );
      if (response.ok) {
        this.setState({ showModal: false }, () => this.props.refetch());
      } else {
        this.setState({ showModal: false });
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount = () => {
    this.setState({ content: this.props.post });
  };
  render() {
    return (
      <>
        <div
          onClick={() => this.setState({ showModal: true })}
          className="JumbBiPencilDiv"
        >
          <IconContext.Provider
            value={{
              size: "24",
              className: "JumbBiPencil",
            }}
          >
            <BiDotsHorizontalRounded />
          </IconContext.Provider>
        </div>
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit your Post</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col xs={2}>
                <img
                  src={this.props.post.user.imgurl}
                  className="postModalImg"
                  alt="profpic"
                  style={{ borderRadius: "100px", width: "50px" }}
                />
                <strong className="ml-2">
                  {this.props.post.user.username}
                </strong>
              </Col>
            </Row>
            <Form className="mt-5">
              <Form.Group>
                <strong>Edit your Title</strong>
                <Form.Control
                  id="title"
                  className="w-full"
                  type="title"
                  placeholder="catchy title"
                  value={this.state.content.title}
                  onChange={(e) => this.onChangeHandler(e)}
                />
              </Form.Group>
              <Form.Group>
                <strong>Edit the Description</strong>
                <Form.Control
                  as="textarea"
                  id="text"
                  rows={3}
                  value={this.state.content.description}
                  onChange={(e) => this.onChangeHandler(e)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.fileSelectHandler}
              ref={(fileInput) => (this.fileInput = fileInput)}
            />

            {this.props.post.userId === this.props.me.id && (
              <Button variant="danger" onClick={() => this.Delete()}>
                Delete
              </Button>
            )}
            <Button variant="primary" onClick={() => this.Edit()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default EditPost;
