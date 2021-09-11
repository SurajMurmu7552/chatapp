import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Route } from "react-router-dom";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

export default function Dashboard() {
  return (
    <Container fluid className="h-100 p-0">
      <Row className="m-0 h-100">
        <Col xs={3} className="p-0 " style={{ borderRight: "1px solid #333" }}>
          <Sidebar />
        </Col>
        <Col className="p-0 ">
          <Route path="/dashboard/chat" component={Chat} />
        </Col>
      </Row>
    </Container>
  );
}
