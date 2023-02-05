const { Notice } = require("../../models/notice");
const RequestError = require("../../helpers/requestError");

const findNoticeById = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  const result = await Notice.findById(id).populate("owner");

  console.log(result);

  if (!result) {
    throw RequestError(404, "Notice not found");
  }

  res.status(200).json(result);
};

module.exports = findNoticeById;
