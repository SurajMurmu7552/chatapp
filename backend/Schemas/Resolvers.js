const UserContact = require("../models/contactModel");
const { v4: uuidv4 } = require("uuid");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const messageSubscribers = [];
const onMessagesUpdates = (fn) => messageSubscribers.push(fn);

const contactSubscribers = [];
const onContactsUpdates = (fn) => contactSubscribers.push(fn);

const resolvers = {
  Query: {
    async getContacts(parent, { userId }) {
      try {
        const user = await UserContact.findOne({ userId });
        if (user) {
          return user.contacts;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getMessages(parent, { userId, contactId }) {
      try {
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

        if (data) {
          const contact = await data.contact;

          return contact[0].messages;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },

  Mutation: {
    async addContact(parent, { userId, contactName }) {
      try {
        let contact = {};

        const alreadyExist = await UserContact.findOne(
          { userId },
          {
            contact: {
              $filter: {
                input: "$contacts",
                as: "contact",
                cond: { $eq: ["$$contact.contactName", contactName] },
              },
            },
          }
        ).lean();

        if (!alreadyExist.contact[0]) {
          const found = await UserContact.findOne({ username: contactName });
          if (found) {
            contact = {
              contactId: found.userId,
              contactName,
            };

            await UserContact.updateOne(
              { userId },
              { $push: { contacts: [contact] } }
            );
          }
        }
        contactSubscribers.forEach((fn) => fn());
        return contact;
      } catch (err) {
        console.log(err);
      }
    },
    async sendMessage(parent, { userId, contactId, msgBody }) {
      try {
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

        messageSubscribers.forEach((fn) => fn());
        return recieveMessage;
      } catch (err) {
        console.log(err);
      }
    },
  },

  Subscription: {
    getContacts: {
      subscribe: (parent, { userId }) => {
        const channel = Math.random().toString(36).slice(2, 15);

        onContactsUpdates(async () => {
          try {
            const user = await UserContact.findOne({ userId });

            if (user) {
              const contacts = await user.contacts;

              await pubsub.publish(channel, { getContacts: contacts });
            }
          } catch (err) {
            console.log(err);
          }
        });
        setTimeout(async () => {
          try {
            const user = await UserContact.findOne({ userId });

            if (user) {
              const contacts = await user.contacts;
              await pubsub.publish(channel, { getContacts: contacts });
            }
          } catch (err) {
            console.log(err);
          }
        }, 0);
        return pubsub.asyncIterator(channel);
      },
    },
    getMessages: {
      subscribe: (parent, { userId, contactId }) => {
        const channel = Math.random().toString(36).slice(2, 15);
        onMessagesUpdates(async () => {
          try {
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
            if (data.contact.length > 0) {
              const messages = await contact[0].messages;
              await pubsub.publish(channel, { getMessages: messages });
            }
          } catch (err) {
            console.log(err);
          }
        });
        setTimeout(async () => {
          try {
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

            if (data.contact.length > 0) {
              const messages = await contact[0].messages;
              await pubsub.publish(channel, { getMessages: messages });
            }
          } catch (err) {
            console.log(err);
          }
        }, 0);

        return pubsub.asyncIterator(channel);
      },
    },
  },
};

module.exports = resolvers;
