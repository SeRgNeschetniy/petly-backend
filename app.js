const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { uploadImage, createImageTag } = require("./middlewares/cloudinary");

dotenv.config();

const authRouter = require("./routes/api/auth");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

(async () => {
  const imagePath =
    "https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg";

  const publicId = await uploadImage(imagePath);
  const imageTag = await createImageTag(publicId);
  console.log(imageTag);
})();

app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
