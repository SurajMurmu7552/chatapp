import React, { useState } from "react";
import Login from "./components/Login";
import Registration from "./components/Registration";

import { Container, Row } from "react-bootstrap";

export default function Auth() {
  const [link, setLink] = useState(true);

  const handleLink = () => {
    setLink(!link);
  };

  return (
    <Container fluid={true} className="h-100 ">
      <Row
        lg={3}
        className="justify-content-md-center align-content-md-center h-100"
      >
        {link ? (
          <Login handleLink={handleLink} />
        ) : (
          <Registration handleLink={handleLink} />
        )}
      </Row>
    </Container>
  );
}
