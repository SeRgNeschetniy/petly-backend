const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const User = require("../../models/users");
const RequestError = require("../../helpers/requestError");
const sendEmail = require("../../helpers/sendEmail");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "233", protocol: "http" });
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Please Verify Your Email Patly",
    html: `<p>Let's verify your email for Patly application. Follow this <a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">link</a> .</p>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

module.exports = register;
