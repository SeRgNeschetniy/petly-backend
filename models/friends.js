const { Schema, model } = require("mongoose");

const handleSchemaErrors = require("../middlewares/handleSchemaErrors");

const friendsSchema = new Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  addressUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  address: {
    type: String,
  },
  workDays: {
    type: [Object],
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
});

friendsSchema.post("save", handleSchemaErrors);

const Friend = model("friend", friendsSchema);

module.exports = Friend;
