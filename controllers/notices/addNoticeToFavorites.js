const User = require("../../models/user");
const RequestError = require("../../helpers/requestError");
const { Notice } = require("../../models/notice");

const addNoticeToFavorites = async (req, res) => {
  const { noticeId } = req.params;
  const { _id } = req.user;

  const user = await User.updateOne(
    { _id },
    { $addToSet: { favorites: noticeId } }
  );

  if (!user) {
    throw RequestError("Unable to add Notice to favorites.");
  }

  const notices = await Notice.findOne({ _id: noticeId });

  res.status(200).json({ notices });
};

module.exports = addNoticeToFavorites;
