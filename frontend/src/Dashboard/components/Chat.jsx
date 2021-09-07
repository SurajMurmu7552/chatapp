import React from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Button,
  Form,
  Col,
} from "react-bootstrap";
import Messages from "./utils/Messages";

export default function Chat() {
  return (
    <>
      <Row className=" m-0">
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand>
              <img
                alt=""
                src="/user.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Sent to
            </Navbar.Brand>
            <Nav className="mq-auto">
              <NavDropdown title="" id="collasible-nav-dropdown">
                <NavDropdown.Item> Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      </Row>
      <Row className="m-0" style={{ height: "84.6%" }}>
        <Container fluid>
          <Messages />
        </Container>
      </Row>
      <Row className="m-0  ">
        <Container fluid className="p-2">
          <Form>
            <Row className="align-items-center m-0">
              <Col>
                <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                  Name
                </Form.Label>
                <Form.Control
                  className=""
                  id="inlineFormInput"
                  placeholder="Enter Message..."
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
