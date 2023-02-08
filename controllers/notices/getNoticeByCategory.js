const { Notice } = require("../../models/notice");
const { RequestError } = require("../../helpers/requestError");

const getNoticeByCategory = async (req, res) => {
  const { categoryName } = req.params;
  let { page = 1, limit = 2, query } = req.query;

  const skip = (parseInt(page) - 1) * limit;
  limit = parseInt(limit) > 20 ? 20 : limit;

  let notices = [];

  if (!query) {
    notices = await Notice.find(
      { category: categoryName },
      { createdAt: 0, updatedAt: 0 },
      { skip, limit }
    );
  } else {
    notices = await Notice.find(
      {
        category: categoryName,
        $or: [
          { title: { $regex: query, $options: "i" } },
          { comments: { $regex: query, $options: "i" } },
          { breed: { $regex: query, $options: "i" } },
        ],
      },
      { createdAt: 0, updatedAt: 0 },
      { skip, limit }
    );
  }

  const total = await Notice.find().count();

  if (!notices) {
    throw new RequestError("Unable to get data from DB.");
  }
  res.status(200).json({ notices, page, limit, total });
};

module.exports = getNoticeByCategory;
