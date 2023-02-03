const jwt = require("jsonwebtoken");

const User = require("../models/user");
const RequestError = require("../helpers/requestError");
const { ACCESS_SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(RequestError(401, "Not authorized"));
  }

  if (!token) {
    next(RequestError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      next(RequestError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch {
    next(RequestError(401, "Not authorized"));
  }
};

module.exports = authenticate;
