import { useQuery } from "@apollo/client";
import React from "react";
import { Alert } from "react-bootstrap";
import { GET_MESSAGES } from "../../../../Graphql/Query";

export default function Messages() {
  const user = JSON.parse(localStorage.getItem("user"));
  const contact = JSON.parse(localStorage.getItem("contact"));

  console.log(user);

  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: {
      getMessagesUserId: user.userId,
      getMessagesContactId: contact.contactId,
    },
  });

  if (loading) return <div>Loading ...</div>;
  if (error) return `${error}`;

  console.log(data.getMessages);

  return (
    <div>
      {data.getMessages.map((message) => {
        if (message.msgType === "sent") {
          return (
            <Alert
              className="ms-auto mt-2  w-50"
              variant="primary"
              id={message.msgId}
              key={message.msgId}
            >
              <p>{message.msgBody}</p>
            </Alert>
          );
        }
        if (message.msgType === "recieve") {
          return (
            <Alert
              className="mt-2 w-50"
              variant="secondary"
              id={message.msgId}
              key={message.msgId}
            >
              <p>{message.msgBody}</p>
            </Alert>
          );
        }
        return null;
      })}
    </div>
  );
}
