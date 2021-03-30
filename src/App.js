import React from "react";
import { withRouter, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Upload from "./components/Upload";
import HotPosts from "./components/HotPosts";
import Trending from "./components/Trending";
import ProfilePage from "./components/ProfilePage";
import Faq from "./components/Faq";
const routes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/home", component: Home },
  { path: "/FAQ", component: Faq },
  { path: "/upload", component: Upload },
  { path: "/HotPosts", component: HotPosts },
  { path: "/trendingPosts", component: Trending },
  { path: "/users/:id", component: ProfilePage }
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