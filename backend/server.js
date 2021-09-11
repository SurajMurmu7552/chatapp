const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

dotenv.config();

const connect = require("./config/db");
const schema = require("./Schemas");
const auth = require("./routes/auth");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect();

app.use("/auth", auth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, console.log("server running on port 4000"));
