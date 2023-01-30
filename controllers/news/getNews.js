const getNews = async (req, res) => {
  const { _id, title, url, description, date } = req;

  res.status(200).json({ _id, title, url, description, date });
};

module.exports = getNews;
