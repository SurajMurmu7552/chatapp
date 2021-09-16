import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
  subscription Subscription($getContactsUserId: String) {
    getContacts(userId: $getContactsUserId) {
      contactId
      contactName
    }
  }
`;

export const GET_MESSAGES = gql`
  subscription Subscription(
    $getMessagesUserId: String
    $getMessagesContactId: String
  ) {
    getMessages(userId: $getMessagesUserId, contactId: $getMessagesContactId) {
      msgId
      msgBody
      msgType
    }
  }
`;
