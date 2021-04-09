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
import PostPage from "./components/PostPage";
import Loading from "./components/Loading";


const routes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/home", component: Home },
  { path: "/FAQ", component: Faq },
  { path: "/upload", component: Upload },
  { path: "/HotPosts", component: HotPosts },
  { path: "/trendingPosts", component: Trending },
  { path: "/Loading", component: Loading }
]
const exclusionArray = [
  '/',
  '/register',
  '/googleOauth',
  '/Loading'
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
      <Route path="/users/:id" render={(props) => <ProfilePage {...props} />} />
      <Route path="/posts/:id" render={(props) => <PostPage {...props} />} />
    </>
  );
}

export default withRouter(App);