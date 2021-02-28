import React from "react";
import "../assets/css/Styles.scss";
import { AuthProvider } from "../contexts/AuthContext";
import { DatabaseProvider } from "../contexts/DatabaseContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Navbar";
import Subnavbar from "./Subnavbar";
import Landing from "./Landing";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Teams from "./Teams";
import Projects from "./Projects";

function App() {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <Router>
          <Navbar />
          <Subnavbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/teams" component={Teams} />
            <PrivateRoute exact path="/projects" component={Projects} />
            <PrivateRoute exact path="/settings" component={Settings} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </Router>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
