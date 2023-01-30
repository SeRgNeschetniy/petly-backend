const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const User = require("../../models/users");
const RequestError = require("../../helpers/requestError");

const avatarsDir = path.join(__dirname, "../../public", "images", "avatars");

const updateUserAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const filename = `${nanoid()}_${originalname}`;

  const image = await Jimp.read(tempUpload);
  image.resize(233, 233).write(tempUpload);

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);

  const result = await User.findOneAndUpdate(_id, { avatarURL });

  if (!result) {
    throw RequestError(401, "Not authorized");
  }

  res.json({ avatarURL, message: "File uploaded successfully" });
};

module.exports = updateUserAvatar;
