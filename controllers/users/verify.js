const User = require("../../models/user");
const RequestError = require("../../helpers/requestError");
const { CLIENT_URL } = process.env;

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw RequestError(404, "User not found");
  }

  await User.findOneAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.redirect(CLIENT_URL);
};

module.exports = verify;
