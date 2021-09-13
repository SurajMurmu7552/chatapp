import { useMutation } from "@apollo/client";
import React, { useState } from "react";
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
import { useHistory } from "react-router";
import { ADD_CONTACT } from "../../../Graphql/Mutation";
import Contacts from "./utils/Contacts";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const history = useHistory();

  const [contactName, setContactName] = useState("");

  const [addContact] = useMutation(ADD_CONTACT);

  const handleAddContact = (e) => {
    e.preventDefault();

    if (contactName !== "" && contactName !== user.userId) {
      addContact({
        variables: {
          addContactUserId: user.userId,
          addContactContactName: contactName,
        },
      });

      setContactName("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("contactId");
    history.push("/");
  };
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
                <NavDropdown.Item onClick={handleLogout}>
                  {" "}
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      </Row>
      <Row className="m-0  ">
        <Container fluid className="p-2">
          <Form onSubmit={handleAddContact}>
            <InputGroup className=" ">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  e.preventDefault();
                  setContactName(e.target.value);
                }}
              />
            </InputGroup>
          </Form>
        </Container>
      </Row>
      <Row className="m-0">
        <Container fluid>
          <Contacts />
        </Container>
      </Row>
    </>
  );
}
