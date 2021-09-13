import React from "react";
import { Spinner } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Componenet, ...rest }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    <Spinner animation="border" />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Componenet {...props} /> : <Redirect to="/" />
      }
    />
  );
}
