import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRegister } from "../../Redux/registerSlice";

import { Form, Button, Alert, Spinner, Container, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

export default function Registration() {
  const dispatch = useDispatch();

  const registerState = useSelector((state) => state.register);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  // if (registerState.status === "success" && registerState.success) {
  //   return <Redirect to="/login" />;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password === confirmPassword) {
      dispatch(postRegister(user));

      setUser({ username: "", password: "" });
      setConfirmPassword("");
    } else {
      setUser({ ...user, password: "" });
      setConfirmPassword("");
    }
  };

  if (localStorage.getItem("user")) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container fluid={true} className="h-100 ">
      <Row
        lg={3}
        className="justify-content-md-center align-content-md-center h-100"
      >
        <Form onSubmit={handleSubmit}>
          <h3 className="mb-3">Registration</h3>
          {registerState.err ? (
            <Alert variant="danger">{registerState.err}. Try again</Alert>
          ) : null}
          {registerState.msg ? (
            <Alert variant="success">{registerState.msg}.</Alert>
          ) : null}
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Control
              type="username"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="new-password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Control
              type="new-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mb-3"
              disabled={registerState.status === "loading" ? true : false}
            >
              Register
            </Button>
            {registerState.status === "loading" ? (
              <Spinner className="mx-2" animation="border" />
            ) : null}
          </Form.Group>
          <Form.Group>
            <Alert variant="primary">
              If you already have an account <Link to="/login">Login</Link>
            </Alert>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}
