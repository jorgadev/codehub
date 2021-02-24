import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

// Get current component and other props
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  // If user is logged in render a component - otherway redirect to login page
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
