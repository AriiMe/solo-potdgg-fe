/** @format */

import React from "react";
import {
  Col,
  Row,
  Alert,
  Card,
  Dropdown,
  Container,
  DropdownButton,
  Button,
  Badge,
  ProgressBar,
} from "react-bootstrap";
import {
  faSteam,
  faTwitch,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HiEye } from "react-icons/hi";
// import Experience from "./Experience";
// import Feature from "./Featured";
// import Sidebar from "./Sidebar";
// import EditPage from "./EditPage";
import "./styles/Profile.css";

import { Route, withRouter } from "react-router-dom";
class ProfilePage extends React.Component {
  state = {
    me: {},
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

  fetchStalks = async () => {
    try {
      const response = await fetch(
        "https://potd-lol.herokuapp.com/potd/stalk/" + this.state.users.id,
        {
          method: "POST",
          credentials: "include",
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  handleStalks = async () => {
    try {
      const result = await fetch(
        `https://potd-lol.herokuapp.com/potd/stalk/${this.props.me.id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const response = await result.json();
      console.log(response);
      await this.fetchStalks();
    } catch (error) {
      await this.fetchStalks();
      console.log(error);
    }
  };
  fetchMe = async () => {
    try {
      const meFetch = await fetch(
        "https://potd-lol.herokuapp.com/potd/users/me",
        {
          credentials: "include",
        }
      );
      const meResponse = await meFetch.json();
      console.log(meResponse);
      this.setState({ me: meResponse });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = async () => {
    this.fetchMe();
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
      <Container className="mt-0">
        <div className="d-flex justify-content-center mt-0">
          {/* <div className="mainBody"> */}
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
              <Col style={{ marginTop: "10vh" }}>
                <Card className="cardProf">
                  <Card.Img
                    className="cardImg"
                    variant="top"
                    src="https://res.cloudinary.com/potd-lol/image/upload/v1617021036/Sprite-0001_a7o9i5.png"
                    style={{ objectFit: "cover" }}
                    alt="placeholder"
                  />
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
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
                        />
                        <strong className="usrnTxt ml-5 h1">
                          {this.state.users.username}
                        </strong>
                        <div className="roletext">{this.state.users.title}</div>
                      </div>
                      <div className="w-7/12">
                        {console.log(Math.floor(this.state.users.xp % 100))}
                        <ProgressBar
                          variant="warning"
                          now={Math.floor(this.state.users.xp % 100)}
                        />
                        <div>
                          <h1>xp points: {this.state.users.xp} </h1>

                          <h5>
                            {Math.floor(this.state.users.xp % 100)}xp left for
                            next level
                          </h5>
                        </div>
                      </div>
                      <div
                        style={{
                          marginRight: "20px",
                          outline: "20px solid #8A0000",

                          height: "150px",
                          width: "150px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
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
                    <div classname="ml-5">
                      {this.state.users.role === "user" ? (
                        <a href="/BuyVip">Buy premium</a>
                      ) : (
                        ""
                      )}
                    </div>
                    {/* <Card.Text> */}
                    <Row>
                      <Col xs={12} lg={2}>
                        {/* <strong className="usrnTxt ml-5 h1">
                            {this.state.users.username}
                          </strong>
                          <div className="roletext">
                            {this.state.users.title}
                          </div> */}
                        {/* <h6 className="areaTxt">{this.state.users.area}</h6> */}
                      </Col>
                      <Col lg={6}>
                        <div className="btnBox">
                          {/* <ProgressBar
                            variant="warning"
                            now={this.state.users.xp / 10}
                          />
                          <h1>xp points: {this.state.users.xp} </h1> */}
                          <Route path="/users/me">
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
                          {/* <div
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
                          </div> */}
                        </div>
                      </Col>
                    </Row>
                    {/* </Card.Text> */}
                  </Card.Body>
                </Card>
                <Container>
                  <Card>
                    <Card.Body class="text-center">
                      <Row>
                        <Col>
                          <Card.Title>
                            Stalk {this.state.users.username}
                          </Card.Title>
                          <button
                            className="text-xl"
                            onClick={() => this.fetchStalks()}
                          >
                            <HiEye />
                            {this.state.users.stalkers.length}
                          </button>
                        </Col>
                        <Col>
                          {" "}
                          <FontAwesomeIcon
                            icon={faYoutube}
                            className="social_icon mt-4 text-4xl"
                            onClick={() =>
                              window.open("https://youtube.com/AriiMe")
                            }
                          />
                        </Col>
                        <Col>
                          <FontAwesomeIcon
                            icon={faTwitch}
                            className="social_icon mt-4 text-4xl"
                            onClick={() =>
                              window.open("https://www.twitch.tv/ariimeme")
                            }
                          />
                        </Col>
                        <Col>
                          <FontAwesomeIcon
                            icon={faSteam}
                            className="social_icon mt-4 text-4xl"
                            onClick={() =>
                              window.open(
                                "https://steamcommunity.com/id/NaeherinBaer500/"
                              )
                            }
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Container>

                <Route path="/users"> {/* <Feature />{" "} */}</Route>
                {/* <Experience users={this.state.users} /> */}
              </Col>
              {/* <Col
                md={4}
                style={{ marginTop: "10vh" }}
                className="d-none d-md-block"
              >
                 <Sidebar /> 
              </Col> */}
            </Row>
          ) : (
            <div></div>
            // this.setState({
            //   err: true,
            //   errType: "warning",
            //   errMsg: "We have encounter a problem, the users is empty",
            // })
          )}
          {/* </div> */}
        </div>
      </Container>
    );
  }
}
export default withRouter(ProfilePage);
