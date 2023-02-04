const { Schema, model } = require("mongoose");

const handleSchemaErrors = require("../middlewares/handleSchemaErrors");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 7,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    birthday: {
      type: String,
      default: "00.00.0000",
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    token: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    notices: [
      {
        type: Schema.Types.ObjectId,
        ref: "notice",
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "notice",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaErrors);

const User = model("user", userSchema);

module.exports = User;
