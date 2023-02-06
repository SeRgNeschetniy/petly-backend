const { Notice } = require("../../models/notice");
const { RequestError } = require("../../helpers/requestError");

const getUserNotices = async (req, res) => {
  const { _id: owner } = req.user;
  const notices = await Notice.find({ owner });

  if (!notices) {
    throw RequestError("Unable to get Notices. ");
  }

  res.status(200).json({ status: "success", notices });
};

module.exports = getUserNotices;
