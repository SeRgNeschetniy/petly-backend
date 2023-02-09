const getUserInfo = async (req, res) => {
  const { _id, name, email, birthday, city, phone, avatarURL, favorites } =
    req.user;

  res
    .status(200)
    .json({ _id, name, email, birthday, city, phone, avatarURL, favorites });
};

module.exports = getUserInfo;
