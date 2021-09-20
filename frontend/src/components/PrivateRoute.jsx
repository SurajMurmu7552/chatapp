import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Componenet, ...rest }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const loginState = useSelector((state) => state.login);
  console.log(user);

  if (loginState.status === "loading") {
    return <div>loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Componenet {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
