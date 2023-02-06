const User = require("../../models/user");
const RequestError = require("../../helpers/requestError");
const { Notice } = require("../../models/notice");

const addNoticeToFavorites = async (req, res) => {
  const { noticeId } = req.params;
  const { id: userId } = req.user;

  await User.updateOne({ _id: userId }, { $addToSet: { favorites: noticeId } });

  res.status(200).json("Notice was added to favorites.");
};

module.exports = addNoticeToFavorites;
