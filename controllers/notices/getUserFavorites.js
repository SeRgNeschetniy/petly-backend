const User = require("../../models/user");
const { RequestError } = require("../../helpers/requestError");

const getUserFavorites = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id).populate("favorites");

  if (!user) {
    throw RequestError("Unable to get Notices.");
  }
  const favorites = user.favorites;

  res.status(200).json({ status: "success", favorites });
};

module.exports = getUserFavorites;
