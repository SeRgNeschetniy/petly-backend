const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { nanoid } = require("nanoid");
const { Notice } = require("../../models/notice");
const User = require("../../models/user");

const RequestError = require("../../helpers/requestError");
const { uploadImage } = require("../../middlewares/cloudinary");

const petsDir = path.join(__dirname, "../../public", "images", "pets");

const addNoticeToCategory = async (req, res) => {
  if (!req.file) {
    throw RequestError(400, "File is required.");
  }

  const { path: tempUpload, originalname } = req.file;
  const { _id: owner } = req.user;
  const { title, name, dateOfBirth, breed } = req.body;

  const filename = `${nanoid()}_${originalname}`;

  const image = await Jimp.read(tempUpload);
  image.resize(336, Jimp.AUTO, Jimp.RESIZE_BEZIER).write(tempUpload);

  const resultUpload = path.join(petsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const petImage = await uploadImage(resultUpload);

  const notice = await Notice.findOne({ title, name, dateOfBirth, breed });

  if (notice) {
    throw RequestError(400, "Notice already exist");
  }

  const newNotice = await Notice.create({
    ...req.body,
    owner,
    petImage,
  });

  await User.updateOne({ _id: owner }, { $push: { notices: newNotice._id } });

  res.status(201).json(newNotice);
};

module.exports = addNoticeToCategory;
