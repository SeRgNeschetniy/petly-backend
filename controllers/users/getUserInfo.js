const getUserInfo = async (req, res) => {
  const { email, name, city, phone, birthday, avatarURL, _id } = req.user;
  res.json({ email, name, city, phone, birthday, avatarURL, _id });
};

module.exports = getUserInfo;
