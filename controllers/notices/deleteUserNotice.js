const User = require("../../models/user");
const { Notice } = require("../../models/notice");
const { RequestError } = require("../../helpers/requestError");

const deleteUserNotice = async (req, res) => {
  const { noticeId } = req.params;
  const { _id } = req.user;

  await Notice.findOneAndDelete({ _id: noticeId });

  const user = await User.updateOne({ _id }, { $pull: { notices: noticeId } });
  if (!user) {
    throw RequestError("Unable to delete Notice");
  }

  res.status(200).json({ message: "Notice was deleted." });
};

module.exports = deleteUserNotice;
