/** @format */

import React from "react";
import { Container, Row } from "react-bootstrap";
import Typewriter from "typewriter-effect";
import "./styles/Loading.css";
function Loading() {
  return (
    <Container className="loadingContainer">
      <Row className="d-flex justify-content-center  align-items-center text-center">
        <span className="loadingFont" id="L">
          P
        </span>

        <span className="loadingFont" id="I">
          O
        </span>

        <span className="loadingFont" id="G">
          T
        </span>

        <span className="loadingFont" id="H">
          D
        </span>

        <span className="loadingFont" id="T">
          !
        </span>
      </Row>
      <h1>
        <Typewriter
          options={{
            strings: ["Loading..."],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
    </Container>
  );
}

export default Loading;
