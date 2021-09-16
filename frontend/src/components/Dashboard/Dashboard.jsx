import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Route } from "react-router-dom";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default function Dashboard() {
  return (
    <ApolloProvider client={client}>
      <Container fluid className="h-100 p-0">
        <Row className="m-0 h-100">
          <Col
            xs={3}
            className="p-0 "
            style={{ borderRight: "1px solid #333" }}
          >
            <Sidebar />
          </Col>
          <Col className="p-0 " style={{ overflowY: "hidden", height: "100%" }}>
            <Route path="/dashboard/chat" component={Chat} />
          </Col>
        </Row>
      </Container>
    </ApolloProvider>
  );
}
