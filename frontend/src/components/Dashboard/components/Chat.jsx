import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Container, Navbar, Row, Button, Form, Col } from "react-bootstrap";
import { SEND_MESSAGE } from "../../../Graphql/Mutation";
import Messages from "./utils/Messages";

export default function Chat() {
  const user = JSON.parse(localStorage.getItem("user"));
  const contact = JSON.parse(localStorage.getItem("contact"));

  const [message, setMessage] = useState("");

  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.length > 0) {
      sendMessage({
        variables: {
          sendMessageUserId: user.userId,
          sendMessageContactId: contact.contactId,
          sendMessageMsgBody: message,
        },
      });

      setMessage("");
    }
  };

  return (
    <>
      <Row className=" m-0" lg={1} md={1}>
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand>
              <img
                alt=""
                src="/user.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                style={{ background: "#fff", borderRadius: "50%" }}
              />{" "}
              {contact.contactName}
            </Navbar.Brand>
          </Container>
        </Navbar>
      </Row>
      <Row className="m-0" lg={1} md={1}>
        <Container
          fluid
          style={{ overflowY: "scroll", overflowX: "hidden", height: "600px" }}
        >
          <Messages />
        </Container>
      </Row>
      <Row className="m-0" lg={1} md={1}>
        <Container fluid className="p-2">
          <Form onSubmit={handleSendMessage}>
            <Row className="align-items-center m-0">
              <Col>
                <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                  Name
                </Form.Label>
                <Form.Control
                  className=""
                  id="inlineFormInput"
                  placeholder="Enter Message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Col>
              <Col xs="auto">
                <Button type="submit" className="">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Row>
    </>
  );
}
