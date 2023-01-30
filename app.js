const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const petsRouter = require("./routes/api/pets");
const authRouter = require("./routes/api/auth");
const friendsRouter = require("./routes/api/friends");

const { uploadImage, createImageTag } = require("./middlewares/cloudinary");

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // add pet from default form(key:value), or true from another form.

// (async () => {
//   const imagePath =
//     "https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg";

//   const publicId = await uploadImage(imagePath);
//   const imageTag = await createImageTag(publicId);
//   console.log(imageTag);
// })();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRouter);
app.use("/api/mypets", petsRouter);
app.use("/api/friends", friendsRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
