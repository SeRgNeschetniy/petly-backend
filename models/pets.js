const { Schema, model } = require("mongoose");
const Joi = require("joi");

// створили схему
const petsSchema = new Schema(
  {
    name: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    breed: {
      type: String,
    },
    сomments: {
      type: String,
      default: false,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { versionkey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
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
