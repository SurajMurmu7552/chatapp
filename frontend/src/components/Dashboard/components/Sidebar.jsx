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
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_CONTACT } from "../../../Graphql/Mutation";
import { removeContact } from "../../../Redux/contactSlice";
import Contacts from "./utils/Contacts";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  const [contactName, setContactName] = useState("");

  const [addContact] = useMutation(ADD_CONTACT);

  const handleAddContact = (e) => {
    e.preventDefault();

    if (contactName !== "" && contactName !== user.username) {
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
    dispatch(removeContact());
  };
  return (
    <>
      <Row className=" m-0">
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
              {user.username}
            </Navbar.Brand>
            <Nav className="mq-auto">
              <NavDropdown title="" id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>
                  {" "}
                  <Link to="/login">Log out</Link>
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
                value={contactName}
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
