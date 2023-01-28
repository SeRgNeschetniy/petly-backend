const User = require("../../models/users");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findOneAndUpdate(_id, { token: "" });

  res.status(204).json();
};

module.exports = logout;
