import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Navbar,
  Row,
  Button,
  Form,
  Col,
  Nav,
} from "react-bootstrap";
import { SEND_MESSAGE } from "../../../Graphql/Mutation";
import Messages from "./utils/Messages";

export default function Chat({ height }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const contact = useSelector((state) => state.contact);

  const [message, setMessage] = useState("");

  console.log("height: %d", height);

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
      <Row className=" m-0 p-0" lg={1} md={1}>
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

            <Nav>
              <Link
                to="/dashboard"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Contacts
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </Row>
      <Row className="m-0 p-0" lg={1} md={1}>
        <Container
          fluid
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            height: "83vh",
          }}
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
