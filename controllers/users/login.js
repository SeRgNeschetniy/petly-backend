const bcrypt = require("bcrypt");

const User = require("../../models/users");
const RequestError = require("../../helpers/requestError");
const { generateTokens } = require("../../helpers/generateTokens");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw RequestError(401, "Email or password is wrong");
  }

  const { token, refreshToken } = await generateTokens(user._id);

  await User.findByIdAndUpdate(user._id, { token, refreshToken });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

module.exports = login;
