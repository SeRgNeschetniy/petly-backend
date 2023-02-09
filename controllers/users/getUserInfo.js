const getUserInfo = async (req, res) => {
  const { _id, name, email, birthday, city, phone, avatarUrl, favorite } =
    req.user;

  res
    .status(200)
    .json({ _id, name, email, birthday, city, phone, avatarUrl, favorite });
};

module.exports = getUserInfo;
