import React from "react";
import { Card } from "react-bootstrap";

export default function Messages() {
  const user = {
    userId: 1,
    username: "suraj",
    password: 123,
  };

  const users = [
    {
      userId: 1,
      contacts: [
        {
          contactId: 10,
          contactName: "malinga",
          messages: [
            {
              msgId: 12320,
              msgBody: "hello",
            },
            {
              msgId: 123200,
              msgBody: "hello",
            },
            {
              msgId: 1232000,
              msgBody: "hello",
            },
          ],
        },
        {
          contactId: 11,
          contactName: "Timmy",
          messages: [
            {
              msgId: 122,
              msgBody: "hello",
            },
            {
              msgId: 132,
              msgBody: "hello",
            },
            {
              msgId: 232,
              msgBody: "hello",
            },
          ],
        },
      ],
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
