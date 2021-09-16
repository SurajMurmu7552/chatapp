const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  contacts: [
    {
      contactId: {
        type: String,
      },
      contactName: {
        type: String,
      },
      messages: [
        {
          msgId: {
            type: String,
            unique: true,
          },
          msgBody: {
            type: String,
          },
          msgType: {
            type: String,
          },
        },
      ],
    },
  ],
});

module.exports = new mongoose.model("userContact", contactSchema);
