/** @format */

import React from "react";
import {
  Col,
  Row,
  Alert,
  Card,
  Dropdown,
  DropdownButton,
  Button,
  Badge,
  ProgressBar,
} from "react-bootstrap";
// import Bio from "./BioCard";
// import Experience from "./Experience";
// import Feature from "./Featured";
// import Sidebar from "./Sidebar";
// import EditPage from "./EditPage";
import "./styles/Profile.css";

import { Route } from "react-router-dom";
class ProfilePage extends React.Component {
  state = {
    users: {},
    experiences: [],
    showAlert: null,
    err: false,
    errType: null,
    errMsg: "",
    loading: true,
    exp: {},
  };

  searchProfile = (id) => {
    fetch("https://potd-lol.herokuapp.com/potd/users/" + id, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((info) => {
        let users = { ...info };
        console.log(users);
        this.setState({ users: users, loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
          err: true,
          errType: "danger",
          errMsg: error.messasge,
        });
      });
  };
  componentDidMount = async () => {
    this.props.match.params.id &&
      this.searchProfile(this.props.match.params.id);
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.searchProfile(this.props.match.params.id);
    }
  };
  render() {
    return (
      <div className="container  d-flex justify-content-center">
        <div className="mainBody">
          {this.state.err && (
            <Alert variant="danger">{this.state.errMsg}</Alert>
          )}
          {this.state.loading && this.state.err !== true ? (
            <div
              style={{ position: "relative", top: "8vh", left: "25vw" }}
              className="lds-facebook"
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : Object.keys(this.state.users).length !== 0 ? (
            <Row className="rowm">
              {/*<Col lg={3}></Col> */}
              <Col md={8} style={{ marginTop: "10vh", width: "100vw" }}>
                <Card className="cardProf" style={{ width: "98vw" }}>
                  <Card.Img
                    className="cardImg"
                    variant="top"
                    src="https://res.cloudinary.com/potd-lol/image/upload/v1617021036/Sprite-0001_a7o9i5.png"
                    style={{ objectFit: "cover" }}
                    alt="placeholder"
                  />
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <div style={{ marginTop: "-130px" }}>
                        <Badge variant="warning">{this.state.users.role}</Badge>
                        <img
                          src={this.state.users.imgurl}
                          alt="placeholder"
                          height="160px"
                          width="160px"
                          style={{
                            borderRadius: "50%",
                            border: "4px solid white",
                            objectFit: "cover",
                          }}
                        ></img>
                      </div>
                    </div>

                    <Card.Text>
                      <Row>
                        <Col xs={12} lg={2}>
                          <strong className="usrnTxt ml-5 h1">
                            {this.state.users.username}
                          </strong>
                          <div className="roletext">
                            {this.state.users.title}
                          </div>
                          <h6 className="areaTxt">{this.state.users.area}</h6>
                        </Col>
                        <Col lg={6}>
                          <div className="btnBox">
                            <Route path="/users/me">
                              <ProgressBar
                                variant="warning"
                                now={this.state.users.xp / 10}
                              />
                              <h1>xp points: {this.state.users.xp} </h1>
                              {/* <EditPage
                                users={this.state.users}
                                refetch={() =>
                                  this.searchProfile(this.props.match.params.id)
                                }
                                color="#0A66CE"
                              /> */}
                            </Route>
                          </div>
                        </Col>
                        <Col>
                          <div className="d-flex justify-content-end mr-5">
                            <div
                              style={{
                                marginTop: "-130px",
                                outline: "20px outset #8A0000",
                                outlineOffset: "25px",
                                width: "100px",
                              }}
                            >
                              <h1
                                className="text text-center"
                                style={{
                                  fontSize: "120px",
                                }}
                              >
                                {this.state.users.level}
                              </h1>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
                {/* <Bio
                  bio={this.state.users.bio}
                  users={this.state.users}
                  refetch={() => this.searchProfile(this.props.match.params.id)}
                /> */}
                <Route path="/users"> {/* <Feature />{" "} */}</Route>
                {/* <Experience users={this.state.users} /> */}
              </Col>
              <Col
                md={4}
                style={{ marginTop: "10vh" }}
                className="d-none d-md-block"
              >
                {/* <Sidebar /> */}
              </Col>
            </Row>
          ) : (
            <div></div>
            // this.setState({
            //   err: true,
            //   errType: "warning",
            //   errMsg: "We have encounter a problem, the users is empty",
            // })
          )}
        </div>
      </div>
    );
  }
}
export default ProfilePage;
