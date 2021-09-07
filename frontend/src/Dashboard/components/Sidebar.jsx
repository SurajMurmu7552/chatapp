import React from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Contacts from "./utils/Contacts";

export default function Sidebar() {
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
              Username
            </Navbar.Brand>
            <Nav className="mq-auto">
              <NavDropdown title="" id="collasible-nav-dropdown">
                <NavDropdown.Item> Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      </Row>
      <Row className="m-0  ">
        <Container fluid className="p-2">
          <Form onSubmit={() => console.log("hello")}>
            <InputGroup className=" ">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Form>
        </Container>
      </Row>
      <Row className="m-0" style={{ height: "84.6%" }}>
        <Container fluid>
          <Contacts />
        </Container>
      </Row>
    </>
  );
}
