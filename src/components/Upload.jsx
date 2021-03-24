
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { withRouter } from "react-router-dom";
import logo from "../logo/potd.gif";
import monke from "../logo/monke.jpg";
import {
  GiVideoCamera
} from "react-icons/gi";
function Upload(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewimg, setPreviewimg] = useState();
  const [img, setImg] = useState("");

  const postUpload = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://potd-lol.herokuapp.com/potd/posts",
        {
          method: "POST",
          body: JSON.stringify({
            title: title,
            description: description,
            img: img
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let resp = await response.json();
      await picFetch(resp.id);
      props.history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const picFetch = async (id) => {
    try {
      let yeet = new FormData();
      yeet.append("ProfilePic", img);
      let response = await fetch(
        `https://potd-lol.herokuapp.com/potd/users/${id}/upload/register`,
        {
          method: "PUT",
          body: yeet,
        }
      );
      let resp = await response.json();
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div class="video-background">
        <div class="video-foreground"></div>
      </div>

      <div className="container mx-auto p-52 text-center text-4xl">
        <div className="container mx-auto"></div>
        <div className="max-w-md mx-auto my-10">
          <img src={logo} alt="potd" width="200" className="mx-auto" />
          <Form onSubmit={postUpload} className="m-7">
            <h1>Import video</h1>
            <button>
              <input
                type="file"
                id="video"
                name="video"
                accept="video/mp4, video/mov"
                className="w-full my-3 monke container mx-auto"
                onChange={(e) => setImg(e.currentTarget.files[0])}
              /> 
              <label htmlFor="video">
                <GiVideoCamera />
              </label>
            </button>

            <Form.Group>
              <Form.Control
                id="title"
                className="w-full my-3"
                type="title"
                placeholder="catchy title"
                value={title}
                required
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                id="description"
                as="textarea" rows={3} 
                className="w-full my-3"
                type="description"
                placeholder="Description"
                value={description}
                required
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </Form.Group>
            
            <button className="w-full my-3" type="submit">
              Upload
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
export default withRouter(Upload);
