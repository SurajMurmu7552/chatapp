const UserContact = require("../models/contactModel");
const { v4: uuidv4 } = require("uuid");

const resolvers = {
  Query: {
    async getContacts(parent, { userId }) {
      const user = await UserContact.findOne({ userId });

      console.log(user);
      return user.contacts;
    },
    async getMessages(parent, { userId, contactId }) {
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

  Mutation: {
    async addContact(parent, { userId, contactId, contactName }) {
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
    async sendMessage(parent, { userId, contactId, msgBody }) {
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
};

module.exports = resolvers;
