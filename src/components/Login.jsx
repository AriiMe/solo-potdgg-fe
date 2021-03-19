/** @format */

import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import "./Login.css";
import clip from "./bgVideo/videoplayback.mp4";
import logo from "../logo/B.png";
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  const loginFetch = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://potd-lol.herokuapp.com/potd/users/login",
        {
          method: "POST",
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let resp = await response.json();
      if (resp.access) {
        localStorage.setItem("accessToken", resp.access);
        localStorage.setItem("refreshToken", resp.refresh);
        props.history.push("/home");
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div class="video-background">
        <div class="video-foreground">
          <video autoPlay loop muted>
            <source src={clip} type="video/mp4" />
            <source src={clip} type="video/ogg" />
          </video>
        </div>
      </div>

      <div className="container flex items-center justify-center h-screen text-4xl">
        <div className="grid grid-flow-row auto-rows-max md:auto-rows-min">
          <div
            className="grid grid-flow-col auto-cols-max md:auto-cols-min "
            xs={12}
          >
            <h1>Login.</h1>
            <img src={logo} alt="potd" width="250" />
          </div>
        </div>
        <div className="grid grid-flow-row auto-rows-max md:auto-rows-min">
          <div
            className="grid grid-flow-col auto-cols-max md:auto-cols-min"
            xs={12}
          >
            <Form onSubmit={loginFetch} className="mx-8 my-8">
              <Form.Group>
                <Form.Control
                  id="login"
                  className="w-full "
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
                  className="w-full"
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </Form.Group>
              <button className="w-full my-3" type="submit">
                <p className="LoginBtn">LogIn</p>
              </button>
              <hr />
              <a href="http://localhost:6969/authors/googleLogin">
                {" "}
                <GoogleButton
                  className="grid justify-items-center"
                  type="dark"
                />
              </a>
              <p className="w-full my-3 text-lg">
                Don't have an account{" "}
                <a href="/register" className="noacc">
                  Sign Up
                </a>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
