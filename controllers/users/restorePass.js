const User = require("../../models/user");
const RequestError = require("../../helpers/requestError");
const sendEmail = require("../../helpers/sendEmail");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const restorePass = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404, "Email is not found");
  }

  const newPassword = nanoid(10);
  const hashPassword = await bcrypt.hash(newPassword, 10);

  await User.findOneAndUpdate(user._id, { password: hashPassword });

  const newPasswordEmail = {
    to: email,
    subject: "Restore password Petly",
    html: `<p>Your password has been changed. Your new password: ${newPassword}. Please return to the Petly site page and log in again.</p>`,
  };

  await sendEmail(newPasswordEmail);

  res.json({ message: "New password email sent" });
};

module.exports = restorePass;
