const { Schema, model } = require("mongoose");

const handleSchemaErrors = require("../middlewares/handleSchemaErrors");

const sponsorsSchema = new Schema({
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

sponsorsSchema.post("save", handleSchemaErrors);

const Sponsor = model("sponsor", sponsorsSchema);

module.exports = Sponsor;
