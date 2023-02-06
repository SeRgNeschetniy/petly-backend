const { Notice } = require("../../models/notice");
const RequestError = require("../../helpers/requestError");

const findNoticeById = async (req, res) => {
  const { id } = req.params;
  const result = await Notice.find({ _id: id }).populate(
    "owner",
    "email phone"
  );

  if (!result) {
    throw RequestError(404, "Notice not found");
  }

  res.status(200).json(result);
};

module.exports = findNoticeById;
