import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";

export default function Contacts() {
  const history = useHistory();

  return (
    <div>
      <Card className="mt-2 ">
        <Card.Body onClick={() => history.push("dashboard/chat")}>
          contact 1
        </Card.Body>
      </Card>
    </div>
  );
}
