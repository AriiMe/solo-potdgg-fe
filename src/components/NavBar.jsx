/** @format */

import React from "react";
import {
  Form,
  FormControl,
  Navbar,
  Nav,
  InputGroup,
  Col,
  Dropdown,
} from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import {
  GiSmallFire,
  GiCloudUpload,
  GiCometSpark,
  GiAbstract038,
} from "react-icons/gi";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import "./styles/NavBar.css";
import logo from "../logo/potdtitle.png";
import coin from "../logo/B.png";
class AppNavBar extends React.Component {
  state = {
    me: {},
    isMobile: window.innerWidth < 700,
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
  componentDidMount() {
    this.fetchMe();
  }
  render() {
    return (
      <Navbar
        id="nav3"
        className={`py-0 fixed-${this.state.isMobile ? "bottom" : "top"}`}
      >
        <div className="navbarContent d-flex justify-content-space-between">
          <div className="ml-0 mr-0 d-flex row">
            <Navbar.Brand
              onClick={() => this.props.history.push("/home")}
              className={`navbarBrand d-flex nowrap mr-${
                this.state.isMobile ? "0" : "2"
              }`}
            >
              <img id="logoboye" width="30" height="30" src={logo} />
            </Navbar.Brand>

            <Col className="navCol">
              <Nav.Link
                as={Link}
                to="/HotPosts"
                className={`navLinkCol ml-${this.state.isMobile ? "0" : "4"}`}
              >
                <GiSmallFire className="navIcon1" />
                <span id="navtext1" className="navIconText">
                  Hot Posts
                </span>
              </Nav.Link>
            </Col>
            <Col className="navCol">
              <Nav.Link
                as={Link}
                to="/trendingPosts"
                className={`navLinkCol ml-${this.state.isMobile ? "0" : "4"}`}
              >
                <GiCometSpark className="navIcon1" />
                <span id="navtext1" className="navIconText">
                  Trending
                </span>
              </Nav.Link>
            </Col>
            <Col className="navCol">
              <Nav.Link
                className="navLinkCol"
                as={Link}
                to="/FAQ"
                className={`navLinkCol ml-${this.state.isMobile ? "0" : "4"}`}
              >
                <GiAbstract038 className="navIcon1" />
                <span id="navtext1" className="navIconText">
                  FAQ
                </span>
              </Nav.Link>
            </Col>
          </div>

          {/* <Form inline className="navSearch">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <IconContext.Provider
                    value={{
                      size: "15",
                      className: "SearchIcon",
                      color: "grey",
                      backgroundColor: "#60627c",
                    }}
                  >
                    <FaSearch />
                  </IconContext.Provider>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                value={this.props.query}
                type="text"
                placeholder="Search"
                className=""
                onChange={(e) => this.props.searchHandler(e)}
              />
            </InputGroup>
          </Form> */}
          <div className="ml-0 mr-0 d-flex row">
            <Col className="navCol">
              <Nav.Link className="navLinkCol" as={Link} to="/users/me">
                <span
                  id="coino"
                  className={`navIconText ml-${
                    this.state.isMobile ? "0" : "4"
                  }`}
                >
                  {this.state.me.coins}
                </span>

                <img
                  style={{
                    width: "40px",
                    borderRadius: "100px",
                  }}
                  src={coin}
                  className="navIcon"
                ></img>
              </Nav.Link>
            </Col>
            <Col className="navCol">
              <Nav.Link
                className={`navLinkCol ml-${this.state.isMobile ? "0" : "4"}`}
                as={Link}
                to="/upload"
              >
                <GiCloudUpload
                  style={{
                    fontSize: "30px",
                    marginBottom: "10px",
                  }}
                  className="navIcon"
                />
              </Nav.Link>
            </Col>
            <Col className="navCol ">
              <Nav.Link
                className={`navLinkCol ml-${this.state.isMobile ? "0" : "4"}`}
              >
                <FaBell className="navIcon " />
              </Nav.Link>
            </Col>
            {/* <div className="vl"></div> */}
            <Col className="navCol">
              <Nav.Link
                className={`navLinkCol ml-${this.state.isMobile ? "0" : "4"}`}
                as={Link}
                to="/users/me"
              >
                <img
                  style={{
                    width: "40px",
                    borderRadius: "100px",
                  }}
                  src={this.state.me.imgurl}
                  className="navIcon"
                ></img>
              </Nav.Link>
            </Col>
          </div>
        </div>
      </Navbar>
    );
  }
}
export default withRouter(AppNavBar);
