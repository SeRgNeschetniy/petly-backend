const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(7).max(32).required(),
  name: Joi.string().required(),
  city: Joi.string().required(),
  phone: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(7).max(32).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  birthday: Joi.string().required(),
  phone: Joi.string().required(),
  city: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
};
