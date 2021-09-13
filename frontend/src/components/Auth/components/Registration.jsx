import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

export default function Registration({ handleLink }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [res, setRes] = useState({
    err: undefined,
    msg: undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password === confirmPassword) {
      const server = await axios.post(
        "http://localhost:4000/auth/register",
        user
      );

      const response = server.data;

      if (server.status === 200) {
        setRes({ msg: response.msg, err: response.err });
      }

      setUser({ username: "", password: "" });
      setConfirmPassword("");
      handleLink();
    } else {
      setRes({ err: "both field of password should match" });
      setUser({ ...user, password: "" });
      setConfirmPassword("");
    }
  };

  const handleErr = () => {
    setRes({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="mb-3">Registration</h3>
      {res.err ? <Alert variant="danger">{res.err}. Try again</Alert> : null}
      {res.msg ? <Alert variant="success">{res.msg}.</Alert> : null}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="username"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          onFocus={handleErr}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          onFocus={handleErr}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={handleErr}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mb-3">
        Register
      </Button>
      <Form.Group>
        <Alert>
          If you already have an account{" "}
          <Alert.Link variant="primary" onClick={handleLink}>
            Login
          </Alert.Link>
        </Alert>
      </Form.Group>
    </Form>
  );
}
