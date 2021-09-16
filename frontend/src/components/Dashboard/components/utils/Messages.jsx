import { useSubscription } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { Alert } from "react-bootstrap";
import { GET_MESSAGES } from "../../../../Graphql/Query";

export default function Messages() {
  const user = JSON.parse(localStorage.getItem("user"));
  const contact = JSON.parse(localStorage.getItem("contact"));

  const end = useRef(null);

  const { loading, error, data } = useSubscription(GET_MESSAGES, {
    variables: {
      getMessagesUserId: user.userId,
      getMessagesContactId: contact.contactId,
    },
  });

  useEffect(() => {
    end.current.scrollIntoView({ behaviour: "smooth" });
  }, [data]);

  if (loading) return <div ref={end}>Loading ...</div>;
  if (error) return <div ref={end}>{error}</div>;

  return (
    <div id="endOfDiv">
      {data ? (
        data.getMessages.map((message) => {
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
        })
      ) : (
        <div />
      )}
      <div ref={end} />
    </div>
  );
}
