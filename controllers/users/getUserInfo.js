const User = require("../../models/user");

const getUserInfo = async (req, res) => {
  const { _id } = req.user;
  const user = await User.find(_id, { password: 0, token: 0, refreshToken: 0 });
  res.status(200).json(user);
};

module.exports = getUserInfo;
