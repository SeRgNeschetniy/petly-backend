const { Notice } = require("../../models/notice");
const { RequestError } = require("../../helpers/requestError");

const getNoticeByCategory = async (req, res) => {
  const { categoryName } = req.params;
  let { page = 1, limit = 10 } = req.query;

  const skip = (parseInt(page) - 1) * limit;
  limit = parseInt(limit) > 20 ? 20 : limit;

  const notices = await Notice.find(
    { category: categoryName },
    { createdAt: 0, updatedAt: 0 },
    { skip, limit }
  );

  if (!notices) {
    throw new RequestError("Unable to get data from DB.");
  }
  res.status(200).json({ notices, page, limit});
};

module.exports = getNoticeByCategory;
