/** @format */

import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { withRouter } from "react-router-dom";
import "./styles/Login.css";
import logo from "../logo/potd.gif";
import monke from "../logo/monke.jpg";
function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [img, setImg] = useState("");
  const [previewimg, setPreviewimg] = useState();

  const signUpFetch = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://potd-lol.herokuapp.com/potd/users/register",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
            username: username,
            gender: gender,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let resp = await response.json();
      await picFetch(resp.id);
      props.history.push("/");
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
      <div className="container mx-auto p-52 text-center text-4xl">
        <div className="container mx-auto"></div>
        <div className="max-w-md mx-auto">
          <img src={logo} alt="potd" width="200" className="mx-auto" />
          <Form onSubmit={signUpFetch} className="m-7">
            <h1>Upload an image</h1>
            <button>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/png, image/jpeg"
                src={monke}
                className="w-full my-3 monke container mx-auto"
                onChange={(e) => setImg(e.currentTarget.files[0])}
              />
              <label htmlFor="image">
                {img ? (
                  <img
                    src={URL.createObjectURL(img)}
                    alt="monke"
                    className="w-full my-3 monkeImg container mx-auto"
                  />
                ) : (
                  <img
                    src={monke}
                    alt="monke"
                    className="w-full my-3 monkeImg container mx-auto"
                  />
                )}
              </label>
            </button>

            <Form.Group>
              <Form.Control
                id="login"
                className="w-full my-3 text-center"
                type="email"
                placeholder="Email Addresss"
                value={email}
                required
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                id="login"
                className="w-full my-3 text-center"
                type="password"
                placeholder="New Password"
                value={password}
                required
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                id="login"
                className="w-full my-3 text-center"
                type="name"
                placeholder="Full Name"
                value={name}
                required
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                id="login"
                className="w-full my-3 text-center"
                type="username"
                placeholder="Username"
                value={username}
                required
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                id="login"
                className="w-full my-3 text-center"
                type="gender"
                placeholder="Specify Gender"
                value={gender}
                required
                onChange={(e) => setGender(e.currentTarget.value)}
              />
            </Form.Group>
            <button className="w-full my-3" type="submit">
              SignUp
            </button>
            <hr />
            <a href="http://localhost:6969/authors/googleLogin">
              {" "}
              <GoogleButton className="container mx-auto" />
            </a>
            <p className="w-full my-3 text-lg">
              Already have an account?{" "}
              <a href="/" className="noacc">
                Sign In
              </a>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}
export default withRouter(Register);
