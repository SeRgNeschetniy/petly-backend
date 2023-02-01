const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const generateTokens = async (_id) => {
  const payload = { id: _id };
  const token = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "30d",
  });
  return { token, refreshToken };
};

module.exports = { generateTokens };
