/** @format */

import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import Loading from "./Loading";
import "./styles/Login.css";
export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginFetch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await fetch(
        "https://potd-lol.herokuapp.com/potd/users/login",
        {
          method: "POST",
          body: JSON.stringify({ username: username, password: password }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let resp = await response.json();
      if (resp.username) {
        setLoading(false);
        props.history.push("/home");
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div class="video-background">
            <div class="video-foreground"></div>
          </div>

          <div className="container flex items-center justify-center h-screen text-4xl">
            <div className="grid grid-flow-row auto-rows-max md:auto-rows-min">
              <div
                className="grid grid-flow-col auto-cols-max md:auto-cols-min "
                xs={12}
              ></div>
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
                  <a href="https://www.potd.lol/googleOauth">
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
      )}
    </>
  );
}
