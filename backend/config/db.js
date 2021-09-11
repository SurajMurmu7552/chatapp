const mongoose = require("mongoose");

// const uri = process.env.DB_URI;

const uri = "mongodb://localhost:27017/chatapp";

console.log(uri);

const connect = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`connected to database ${conn.connection.name}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connect;
