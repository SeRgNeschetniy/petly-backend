const { Schema, model } = require("mongoose");
const Joi = require("joi");

// створили схему
const petsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [2, "Min length 2 characters"],
      maxlength: [16, "Max length 16 characters"],
    },
    dateOfBirth: {
      type: String,
      default: "00.00.0000",
    },
    breed: {
      type: String,
      required: [true, "Breed is required"],
      minLength: [2, "Min length 2 characters"],
      maxlength: [16, "Max length 16 characters"],
    },
    // photoPet: {
    //   type: String,
    //   required: true,
    // },
    сomments: {
      type: String,
      default: false,
      required: [true, "Your pet need description"],
      minLength: [8, "Min length 8 characters"],
      maxlength: [120, "Max length 120 characters"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionkey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  // dateOfBirth: Joi.date().required(),
  breed: Joi.string().required(),
  Comments: Joi.string().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schema = {
  addSchema,
  updateFavoriteSchema,
};

const Pets = model("pet", petsSchema);

module.exports = { Pets, schema };