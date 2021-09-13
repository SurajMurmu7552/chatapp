import { gql } from "@apollo/client";

export const ADD_CONTACT = gql`
  mutation Mutation($addContactUserId: String, $addContactContactName: String) {
    addContact(userId: $addContactUserId, contactName: $addContactContactName) {
      contactId
      contactName
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation Mutation(
    $sendMessageUserId: String
    $sendMessageContactId: String
    $sendMessageMsgBody: String
  ) {
    sendMessage(
      userId: $sendMessageUserId
      contactId: $sendMessageContactId
      msgBody: $sendMessageMsgBody
    ) {
      msgBody
    }
  }
`;
