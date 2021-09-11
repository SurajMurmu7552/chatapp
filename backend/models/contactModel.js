const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
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
