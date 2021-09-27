import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Route } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";

import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { client } from "../../config/apolloConnection";

export default function Dashboard() {
  const [height, setHeight] = useState(0);
  const view = useRef(null);

  useEffect(() => {
    setHeight(view.current.clientWidth);
  }, [view]);

  console.log(height);

  if (height < 768) {
    return (
      <ApolloProvider client={client}>
        <Container fluid className="h-100 p-0" ref={view}>
          <Row className="m-0 ">
            <Route exact path="/dashboard" component={Sidebar} />
            <Route path="/dashboard/chat" component={Chat} height={height} />
          </Row>
        </Container>
      </ApolloProvider>
    );
  }
  if (height > 768) {
    return (
      <ApolloProvider client={client}>
        <Container fluid className="h-100 p-0" ref={view}>
          <Row className="m-0 h-100">
            <Col
              md={3}
              className="p-0 "
              style={{ borderRight: "1px solid #333" }}
            >
              <Sidebar />
            </Col>
            <Col
              className="p-0"
              md={9}
              style={{ overflowY: "hidden", height: "100vh" }}
            >
              <Route path="/dashboard/chat" component={Chat} />
            </Col>
          </Row>
        </Container>
      </ApolloProvider>
    );
  }

  return <div>hello</div>;
}
