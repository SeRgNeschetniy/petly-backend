const { default: mongoose } = require("mongoose");

const getFriends = async (req, res) => {
  const result = await mongoose.connection.db
    .collection("sponsors")
    .find()
    .toArray();

  res.status(200).json(result);
};

module.exports = getFriends;
