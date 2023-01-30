const getUserInfo = async (req, res) => {
  const { email, name, city, phone, birthday, avatarURL } = req.user;
  res.json({ email, name, city, phone, birthday, avatarURL });
};

module.exports = getUserInfo;
