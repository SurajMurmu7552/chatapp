import React from "react";
import { Alert, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSubscription } from "@apollo/client";

import { GET_CONTACTS } from "../../../../Graphql/Query";
import { useDispatch } from "react-redux";
import { addContact } from "../../../../Redux/contactSlice";

export default function Contacts() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const { loading, error, data } = useSubscription(GET_CONTACTS, {
    variables: {
      getContactsUserId: user.userId,
    },
    shouldResubscribe: true,
  });

  const handleContactId = (e) => {
    const contactId = e.target.parentElement.parentElement.id;

    const contactName = e.target.innerHTML;

    const contact = {
      contactId,
      contactName,
    };

    dispatch(addContact(contact));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return ` ${error}`;

  console.log(data.getContacts.length);

  if (data.getContacts.length > 0) {
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

  return (
    <div>
      <Alert variant="light">
        <p>Both Users should have added each other with unique username</p>
      </Alert>
    </div>
  );
}
