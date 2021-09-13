import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_CONTACTS } from "../../../../Graphql/Query";

export default function Contacts() {
  const user = JSON.parse(localStorage.getItem("user"));

  const { loading, error, data } = useQuery(GET_CONTACTS, {
    variables: {
      getContactsUserId: user.userId,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return ` ${error}`;

  const handleContactId = (e) => {
    const contactId = e.target.parentElement.parentElement.id;

    const contactName = e.target.innerHTML;

    const contact = {
      contactId,
      contactName,
    };

    localStorage.setItem("contact", JSON.stringify(contact));
  };

  // await localStorage.setItem("contactId", contactId);

  return (
    <div>
      {data.getContacts.map(({ contactId, contactName }) => (
        <Card className="mt-2" id={contactId} key={contactId}>
          <Link
            onClick={handleContactId}
            to="/dashboard/chat"
            style={{ textDecoration: "none", color: "#333" }}
          >
            <Card.Body>{contactName}</Card.Body>
          </Link>
        </Card>
      ))}
    </div>
  );
}
