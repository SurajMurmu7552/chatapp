const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const MessageType = new GraphQLObjectType({
  name: "message",
  description: "single message",
  fields: () => ({
    msgId: { type: GraphQLString },
    msgBody: { type: GraphQLString },
  }),
});

module.exports = MessageType;
