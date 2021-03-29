/** @format */

import React from "react";
import { Container, Col, Row } from "react-bootstrap";
function Faq() {
  return (
    <>
      <Container style={{ marginTop: "20vh" }} className=" mr-auto text-center">
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col xs={8} className="content">
            <h1 style={{ color: "red" }}>What is POTD?</h1>
            <p style={{ fontSize: "25px" }}>
              POTD is a video sharing social media site for video games
            </p>
            <h1 style={{ color: "red" }}>Are our accounts secure?</h1>
            <p style={{ fontSize: "25px" }}>
              we use hashed authentication and hide personal info from database
            </p>
            <h1 style={{ color: "red" }}>How do I gain XP and Level up?</h1>
            <p style={{ fontSize: "25px" }}>
              By liking posts and leaving comments. VIP users get 2x amount of
              XP
            </p>
            <h1 style={{ color: "red" }}>What can I post here?</h1>
            <p style={{ fontSize: "25px" }}>
              Only video game related videos, max 20sec
            </p>
            <h1 style={{ color: "red" }}>How can I contact support?</h1>
            <p style={{ fontSize: "25px" }}>
              Write an email by clicking {""}
              <a href="mailto:support@potd.lol">Here</a> or fill out our contact
              formular
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Faq;
