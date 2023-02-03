const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const User = require("../../models/user");
const RequestError = require("../../helpers/requestError");
const { uploadImage } = require("../../middlewares/cloudinary");

const avatarsDir = path.join(__dirname, "../../public", "images", "avatars");

const updateUserAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const filename = `${nanoid()}_${originalname}`;

  const image = await Jimp.read(tempUpload);
  image.resize(233, 233).write(tempUpload);

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = await uploadImage(resultUpload);

  const result = await User.findOneAndUpdate(_id, { avatarURL });

  if (!result) {
    throw RequestError(401, "Not authorized");
  }

  res.json({ avatarURL, message: "success" });
};

module.exports = updateUserAvatar;
