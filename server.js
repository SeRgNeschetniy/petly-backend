const mongoose = require("mongoose");
const fs = require("fs/promises");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set("strictQuery", true);

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
  .connect(DB_HOST || 3000)
  .then(() => {
    app.listen(PORT, () => {
      createFolderIsNotExist(uploadDir);
      createFolderIsNotExist(storeImage);
      console.log(
        "\x1b[46m",
        `==>Server running. Use our API on port: ${PORT}<==`,
        "\x1b[0m"
      );
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
