import React from "react";
import { withRouter, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
const routes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/home", component: Home }
]
const exclusionArray = [
  '/',
  '/register',
]

function App({ location }) {
  return (
    <>
      { exclusionArray.indexOf(location.pathname) < 0 && <NavBar />}
      {
        routes.map(({ path, component }) =>
          <Route exact path={path} component={component} />
        )
      }
    </>
  );
}

export default withRouter(App);