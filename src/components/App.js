import React from "react";
import "../assets/css/Styles.scss";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Navbar";
import Subnavbar from "./Subnavbar";
import Landing from "./Landing";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Index from "./Index";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Subnavbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/index" component={Index} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
