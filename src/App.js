import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
const routes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/home", component: Home }
]

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      {
        routes.map(({ path, component }) =>
          <Route exact path={path} component={component} />
        )
      }
    </Router>
  );
}

export default App;