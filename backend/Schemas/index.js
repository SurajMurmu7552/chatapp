const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require("graphql");

const { v4: uuidv4 } = require("uuid");

const UserContact = require("../models/contactModel");

const ContacType = require("./TypeDefs/ContactType");
const MessageType = require("./TypeDefs/MessageType");

const RootQueryType = new GraphQLObjectType({
  name: "rootQuery",
  fields: () => ({
    contacts: {
      type: new GraphQLList(ContacType),
      description: "list of contacts",
      args: {
        userId: { type: GraphQLString },
      },
      resolve: async (parent, { userId }) => {
        const user = await UserContact.findOne({ userId });

        console.log(user);
        return user.contacts;
      },
    },
    messages: {
      type: new GraphQLList(MessageType),
      description: "list of messages",
      args: {
        userId: { type: GraphQLString },
        contactId: { type: GraphQLString },
      },
      resolve: async (parent, { userId, contactId }) => {
        const data = await UserContact.findOne(
          {
            userId,
          },
          {
            contact: {
              $filter: {
                input: "$contacts",
                as: "contact",
                cond: { $eq: ["$$contact.contactId", contactId] },
              },
            },
          }
        ).lean();

        const contact = await data.contact;

        return contact[0].messages;
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "rootMutation",
  fields: () => ({
    addContact: {
      type: ContacType,
      description: "add a contact",
      args: {
        userId: { type: GraphQLString },
        contactId: { type: GraphQLString },
        contactName: { type: GraphQLString },
      },
      resolve: async (parent, { userId, contactId, contactName }) => {
        const contact = {
          contactId,
          contactName,
        };

        await UserContact.updateOne(
          { userId },
          { $push: { contacts: [contact] } }
        );

        return contact;
      },
    },
    sendMessage: {
      type: MessageType,
      description: "add a message",
      args: {
        userId: { type: GraphQLString },
        contactId: { type: GraphQLString },
        msgBody: { type: GraphQLString },
      },
      resolve: async (parent, { userId, contactId, msgBody }) => {
        const msgId = uuidv4();
        const sentMessage = {
          msgId,
          msgBody,
          msgType: "sent",
        };

        const recieveMessage = {
          msgId,
          msgBody,
          msgType: "recieve",
        };

        await UserContact.updateMany(
          {
            userId,
          },
          {
            $push: { "contacts.$[element].messages": sentMessage },
          },
          {
            arrayFilters: [{ "element.contactId": contactId }],
          }
        );
        await UserContact.updateMany(
          {
            userId: contactId,
          },
          {
            $push: { "contacts.$[element].messages": recieveMessage },
          },
          {
            arrayFilters: [{ "element.contactId": userId }],
          }
        );

        return recieveMessage;
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
