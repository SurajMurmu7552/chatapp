import React from "react";
import { Form, Button, Alert } from "react-bootstrap";

export default function Registration({ handleLink }) {
  return (
    <Form>
      <h3 className="mb-3">Registration</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="username" placeholder="Username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="password" placeholder="Confirm Password" />
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
