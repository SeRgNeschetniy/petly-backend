const jwt = require("jsonwebtoken");

const User = require("../../models/users");

const { SECRET_KEY, BASE_URL, PORT } = process.env;

const google = async (req, res) => {
  const { _id: id } = req.user;

  const payload = {
    id,
  };

  console.log(id);

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.redirect(`${BASE_URL}:${PORT}?token=${token}`);
};

module.exports = google;
