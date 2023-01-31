const multer = require("multer");
const path = require("path");

const uploadDir = path.join(process.cwd(), "tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    //reject file
    cb({ message: "Unsupported file format, please use .jpeg or .png" }, false);
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: fileFilter,
});

module.exports = upload;
