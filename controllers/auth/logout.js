const User = require("../../models/users");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findOneAndUpdate(_id, { token: "", refreshToken: "" });
  res.clearCookie("refreshToken");

  res.status(204).json();
};

module.exports = logout;
