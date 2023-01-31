const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const { Pets } = require("../../models/pet");
const { uploadImage } = require("../../middlewares/cloudinary");

const photoDir = path.join(__dirname, "../../public", "images", "photopets");

const addPet = async (req, res) => {
  try {
    if (!req.file) {
      const { _id: owner } = req.user;
      const addNewPet = await Pets.create({
        ...req.body,
        owner,
      });
      res.status(201).json(addNewPet);
    } else {
      const { path: tempUpload, originalname } = req.file;

      const { _id: owner } = req.user;

      const fileName = `${nanoid()}_${originalname}`;

      const image = await Jimp.read(tempUpload);
      image.resize(182, 182).write(tempUpload);

      const photoNewPath = path.join(photoDir, fileName);
      await fs.rename(tempUpload, photoNewPath);

      const photoURL = await uploadImage(photoNewPath);

      const addNewPet = await Pets.create({
        ...req.body,
        owner,
        photoPet: photoURL,
      });
      res.status(201).json(addNewPet);
    }
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = addPet;
