const Sponsor = require("../../models/friends");

const getFriends = async (req, res) => {
  const result = await Sponsor.find();

  res.status(200).json(result);
};

module.exports = getFriends;
