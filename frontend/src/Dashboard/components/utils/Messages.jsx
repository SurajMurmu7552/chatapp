import React from "react";
import { Card } from "react-bootstrap";

export default function Messages() {
  const messages = [
    {
      id: 1,
      msg: "message1",
    },
  ];

  return (
    <div>
      <Card className="mt-2 w-50">
        <Card.Body>message 1</Card.Body>
      </Card>
      <Card className="mt-2 w-50">
        <Card.Body>message 2</Card.Body>
      </Card>
      <Card className="ms-auto mt-2 w-50">
        <Card.Body>message 2</Card.Body>
      </Card>
      <Card className="ms-auto mt-2  w-50">
        <Card.Body>message 2</Card.Body>
      </Card>
    </div>
  );
}
