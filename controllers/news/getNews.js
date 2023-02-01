const New = require("../../models/news");

const getNews = async (req, res) => {
  const result = await New.find();

  res.status(200).json(result);
};

module.exports = getNews;
