const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const { Pets } = require("../../models/pet");
const { uploadImage } = require("../../middlewares/cloudinary");

const photoDir = path.join(__dirname, "../../public", "images", "pets");

const addPet = async (req, res) => {
  if (!req.file) {
    res.status(206).json({ message: "Probably no pet's photo, add photo" });
  } else {
    const { path: tempUpload, originalname } = req.file;

    const { _id: owner } = req.user;

    const fileName = `${nanoid()}_${originalname}`;

    const image = await Jimp.read(tempUpload);
    image.resize(240, Jimp.AUTO, Jimp.RESIZE_BEZIER).write(tempUpload);

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
};

module.exports = addPet;
