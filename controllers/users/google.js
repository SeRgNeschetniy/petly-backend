const { generateTokens } = require("../../helpers/generateTokens");

const User = require("../../models/user");

const { BASE_URL, PORT } = process.env;

const google = async (req, res) => {
  const { _id } = req.user;

  const { token, refreshToken } = await generateTokens(_id);
  await User.findByIdAndUpdate(_id, { token, refreshToken });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.redirect(`http://localhost:3000/petly-frontend/login?token=${token}`);
};

module.exports = google;
