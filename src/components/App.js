import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../assets/css/Styles.scss";

import Navbar from "./Navbar";
import Subnavbar from "./Subnavbar";
import Landing from "./Landing";

function App() {
  return (
    <>
      <Navbar />
      <Subnavbar />
      <Router>
        <Route exact path="/" component={Landing} />
        {/* <PrivateRoute path="/dashboard" component={} />
        <PrivateRoute path="/teams" component={} />
        <PrivateRoute path="/projects" component={} />
        <PrivateRoute path="/settings" component={} />
        <Route path="/signup" component={} />
        <Route path="/login" component={} />
        <Route path="/forgot-password" component={} /> */}
      </Router>
    </>
  );
}

export default App;
