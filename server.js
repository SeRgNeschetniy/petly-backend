const mongoose = require("mongoose");
const fs = require("fs/promises");
const path = require("path");

mongoose.set('strictQuery', true);

const uploadDir = path.join(process.cwd(), "tmp");
const storeImage = path.join(process.cwd(), "public", "images", "avatars");

const app = require("./app");

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      createFolderIsNotExist(uploadDir);
      createFolderIsNotExist(storeImage);
      console.log(`Server running. Use our API on port: ${PORT}`);
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
