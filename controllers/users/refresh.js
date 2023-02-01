const jwt = require("jsonwebtoken");
const RequestError = require("../../helpers/requestError");
const User = require("../../models/users");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken);

  if (!refreshToken) {
    throw RequestError(401, "Not authorized");
  }

  const { _id } = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
  const tokenFromDB = User.findOne({ _id, refreshToken });

  console.log(_id);
  console.log(tokenFromDB);
};

module.exports = refresh;
