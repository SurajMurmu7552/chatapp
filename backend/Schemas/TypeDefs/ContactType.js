const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");
// const MessageType = require("./MessageType");

const ContacType = new GraphQLObjectType({
  name: "contact",
  description: "a single contact",
  fields: () => ({
    contactId: { type: GraphQLString },
    contactName: { type: GraphQLString },
    // message: {
    //   type: new GraphQLList(MessageType),
    //   resolve: (parent, args) => parent.message,
    // },
  }),
});

module.exports = ContacType;
