const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { createServer } = require("http");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");

dotenv.config();

const connect = require("./config/db");
const auth = require("./routes/auth");
const typeDefs = require("./Schemas/TypeDefs");
const resolvers = require("./Schemas/Resolvers");

(async () => {
  const app = express();
  const httpServer = createServer(app);

  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  connect();

  app.use("/auth", auth);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(4000, console.log("server running on port 4000"));

  // await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  // console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})();
