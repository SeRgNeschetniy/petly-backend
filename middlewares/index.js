const authenticate = require("./authenticate");
const handleSchemaErrors = require("./handleSchemaErrors");
const passport = require("./passport");
const upload = require("./uploadFile");
const { validator } = require("./validationMidlewares");

module.exports = {
  authenticate,
  handleSchemaErrors,
  passport,
  upload,
  validator,
};
