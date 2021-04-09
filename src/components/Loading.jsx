/** @format */

import React from "react";
import { Container, Row } from "react-bootstrap";
import "./styles/Loading.css";
function Loading() {
  return (
    <Container className="loadingContainer">
      <Row className="d-flex justify-content-center  align-items-center text-center">
        <span style={{ fontSize: "200px", letterSpacing: "3px" }} id="L">
          P
        </span>

        <span style={{ fontSize: "200px" }} id="I">
          O
        </span>

        <span style={{ fontSize: "200px", letterSpacing: "3px" }} id="G">
          T
        </span>

        <span style={{ fontSize: "200px", letterSpacing: "3px" }} id="H">
          D
        </span>

        <span style={{ fontSize: "200px", letterSpacing: "3px" }} id="T">
          !
        </span>
      </Row>
    </Container>
  );
}

export default Loading;
