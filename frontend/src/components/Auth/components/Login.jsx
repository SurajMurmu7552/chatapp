import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

export default function Login({ handleLink }) {
  const history = useHistory();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [res, setRes] = useState({
    err: undefined,
    msg: undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const server = await axios.post("http://localhost:4000/auth/login", user);

    const response = server.data;

    setUser({ username: "", password: "" });

    setRes({ msg: response.msg, err: response.err });
    localStorage.setItem("user", JSON.stringify(response.data));

    if (response.success) {
      history.push("/dashboard");
    }
  };

  const handleErr = () => {
    setRes({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="mb-3">Login</h3>
      {res.err ? <Alert variant="danger">{res.err}. Try again</Alert> : null}
      {res.msg ? <Alert variant="success">{res.msg}.</Alert> : null}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="username"
          placeholder="Username"
          required
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          onFocus={handleErr}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="password"
          placeholder="Password"
          required
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          onFocus={handleErr}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mb-3 ">
        Log In
      </Button>
      <Form.Group>
        <Alert>
          If you don't have an account{" "}
          <Alert.Link variant="primary" onClick={handleLink}>
            Registration
          </Alert.Link>
        </Alert>
      </Form.Group>
    </Form>
  );
}
