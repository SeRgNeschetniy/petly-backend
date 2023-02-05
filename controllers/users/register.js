const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const User = require("../../models/user");
const RequestError = require("../../helpers/requestError");
const transporter = require("../../helpers/sendEmail");
const { generateTokens } = require("../../helpers/generateTokens");
const { BASE_URL, FROM_EMAIL } = process.env;

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

  console.log(newUser._id);

  const { token, refreshToken } = await generateTokens(newUser._id);

  await User.findByIdAndUpdate(newUser._id, { token, refreshToken });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  const verifyEmail = {
    from: FROM_EMAIL,
    to: email,
    subject: "Please Verify Your Email Patly",
    html: `<p>Let's verify your email for Patly application. Follow this <a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">link</a> .</p>`,
  };

  await transporter.sendMail(verifyEmail);

  res.status(201).json({
    token,
    refreshToken,
    verificationToken,
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

module.exports = register;
