// контроллер з логікою
const getUserInfo = async (req, res) => {
  const { email, name, city, phone, birthday, avatarURL } = req.user;
  const {} = req.pets;
  res.status(200).json({ email, name, city, phone, birthday, avatarURL });
};

module.exports = getUserInfo;
