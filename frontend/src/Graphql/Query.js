import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
  query Query($getContactsUserId: String) {
    getContacts(userId: $getContactsUserId) {
      contactId
      contactName
    }
  }
`;

export const GET_MESSAGES = gql`
  query Query($getMessagesUserId: String, $getMessagesContactId: String) {
    getMessages(userId: $getMessagesUserId, contactId: $getMessagesContactId) {
      msgId
      msgBody
      msgType
    }
  }
`;
