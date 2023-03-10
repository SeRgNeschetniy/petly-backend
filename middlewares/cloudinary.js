const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    transformation: [{ height: 328, width: 328, crop: "crop" }],
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};

const getAssetInfo = async (publicId) => {
  const options = {
    colors: true,
  };

  try {
    const result = await cloudinary.api.resource(publicId, options);
    return result.colors;
  } catch (error) {
    console.error(error);
  }
};

const createImageTag = (publicId) => {
  const imageTag = cloudinary.image(publicId, {
    transformation: [
      { width: 250, height: 250, gravity: "faces", crop: "thumb" },
      { radius: "max" },
      { effect: "outline:10" },
    ],
  });

  return imageTag;
};

module.exports = { uploadImage, getAssetInfo, createImageTag };
