const mongoose = require("mongoose");

const uri = process.env.DB_URI;

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
