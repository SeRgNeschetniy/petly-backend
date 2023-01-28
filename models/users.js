const { Schema, model } = require("mongoose");

const handleSchemaErrors = require("../middlewares/handleSchemaErrors");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 32,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    phone: {
      type: String,
      required: [true, "Mobile phone is required"],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaErrors);

const User = model("user", userSchema);

module.exports = User;
