/** @format */

import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { withRouter } from "react-router-dom";
import logo from "../logo/potd.gif";
import monke from "../logo/monke.jpg";
import { GiVideoCamera } from "react-icons/gi";
import Typewriter from "typewriter-effect";
function Upload(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [processing, setProcessing] = useState(false);
  const [toolong, setToolong] = useState(false);
  const postUpload = async (e) => {
    try {
      let response = await fetch("https://potd-lol.herokuapp.com/potd/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: description,
          imgurl: "",
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let resp = await response.json();
      await vidUpload(resp.id);
      props.history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const vidUpload = async (id) => {
    try {
      let yeet = new FormData();
      yeet.append("PostImage", img);
      let response = await fetch(
        `https://potd-lol.herokuapp.com/potd/posts/${id}/upload`,
        {
          method: "PUT",
          credentials: "include",
          body: yeet,
        }
      );
      let resp = await response.json();
      console.log(resp);
      console.log("succ");
    } catch (error) {
      console.log(error);
    }
  };

  const checkDuration = (e) => {
    e.preventDefault();
    let video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      let duration = video.duration;
      img.duration = duration;
      console.log(img);
      if (img.duration <= 20) {
        setProcessing(true);
        postUpload(img);
      } else {
        console.log("video is longer than 20sex");
        setToolong(true);
      }
    };
    video.src = URL.createObjectURL(img);
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
          <Form onSubmit={checkDuration} className="m-7">
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
                as="textarea"
                rows={3}
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
          {processing ? <h1> <Typewriter
          options={{
            strings: ["Processing..."],
            autoStart: true,
            loop: true,
          }}
        /></h1> : <></>}
          {toolong ? <h1>Video longer than 20 sec</h1> : <></>}
        </div>
      </div>
    </>
  );
}
export default withRouter(Upload);
