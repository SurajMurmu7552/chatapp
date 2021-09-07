import React from "react";
import { Form, Button, Alert } from "react-bootstrap";

export default function Login({ handleLink }) {
  return (
    <Form>
      <h3 className="mb-3">Login</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="username" placeholder="Username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="password" placeholder="Password" />
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
