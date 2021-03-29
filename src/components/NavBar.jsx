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
        <div className="navbarContent">
          <Navbar.Brand
            onClick={() => this.props.history.push("/home")}
            className="navbarBrand d-flex nowrap mr-2"
          >
            <img id="logoboye" src={logo} />
          </Navbar.Brand>
          <Nav.Link
            className={`navLinkCol ml-${this.state.isMobile ? "1" : "5"}`}
          >
            <Col className="navCol">
              <GiSmallFire className="navIcon1" />
              <span id="navtext1" className="navIconText">
                Hot Posts
              </span>
            </Col>
          </Nav.Link>
          <Nav.Link
            className={`navLinkCol ml-${this.state.isMobile ? "0" : "4"}`}
          >
            <Col className="navCol">
              <GiCometSpark className="navIcon1" />
              <span id="navtext1" className="navIconText">
                Trending
              </span>
            </Col>
          </Nav.Link>
          <Nav.Link
            className="navLinkCol"
            as={Link}
            to="/FAQ"
            className={`navLinkCol ml-${this.state.isMobile ? "0" : "4"}`}
          >
            <Col className="navCol">
              <GiAbstract038 className="navIcon1" />
              <span id="navtext1" className="navIconText">
                FAQ
              </span>
            </Col>
          </Nav.Link>

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
          <div className="ml-auto mr-0 d-flex row justify-content-end">
            <Nav.Link className="navLinkCol" as={Link} to="/users/me">
              <span id="coino" className="navIconText">
                {this.state.me.coins}
              </span>

              <Col className="navCol">
                <img
                  style={{
                    height: "30px",
                    borderRadius: "100px",
                  }}
                  src={coin}
                  className="navIcon"
                ></img>
              </Col>
            </Nav.Link>

            <Nav.Link clas sName="navLinkCol" as={Link} to="/upload">
              <Col className="navCol">
                <GiCloudUpload className="navIcon" />
                <span style={{ marginBottom: "13px" }} className="navIconText">
                  Upload
                </span>
              </Col>
            </Nav.Link>

            <Nav.Link className="navLinkCol">
              <Col className="navCol ">
                <FaBell className="navIcon " />
                <span className="navIconText">Notifications</span>
              </Col>
            </Nav.Link>

            {/* <div className="vl"></div> */}
            <Nav.Link className="navLinkCol" as={Link} to="/users/me">
              <Col className="navCol">
                <img
                  style={{
                    height: "40px",
                    borderRadius: "100px",
                  }}
                  src={this.state.me.imgurl}
                  className="navIcon"
                ></img>
              </Col>
            </Nav.Link>
          </div>
        </div>
      </Navbar>
    );
  }
}
export default withRouter(AppNavBar);
