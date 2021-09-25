import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Button, Alert, Spinner, Container, Row } from "react-bootstrap";
import { getLogin } from "../../Redux/loginSlice";
import { Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.login);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(getLogin(user));

    setUser({ username: "", password: "" });
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
          <h3 className="mb-3">Login</h3>
          {loginState.success === false ? (
            <Alert variant="danger">Wrong credentials. Try again</Alert>
          ) : null}

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Control
              type="username"
              placeholder="Username"
              required
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="new-password"
              placeholder="Password"
              required
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mb-3"
              disabled={loginState.status === "loading" ? true : false}
            >
              Log In
            </Button>
            {loginState.status === "loading" ? (
              <Spinner className="mx-2" animation="border" />
            ) : null}
          </Form.Group>
          <Form.Group>
            <Alert variant="primary">
              If you don't have an account{" "}
              <Link to="/registration">Register</Link>
            </Alert>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}
