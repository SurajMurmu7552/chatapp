const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Contact {
    contactId: String
    contactName: String
  }

  type Message {
    msgId: String
    msgBody: String
  }

  #Queries
  type Query {
    getContacts(userId: String): [Contact]
    getMessages(userId: String, contactId: String): [Message]
  }

  #Mutations

  type Mutation {
    addContact(userId: String, contactId: String, contactName: String): Contact
    sendMessage(userId: String, contactId: String, msgBody: String): Message
  }
`;

module.exports = typeDefs;
