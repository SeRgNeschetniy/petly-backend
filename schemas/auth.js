const Joi = require("joi");

const emailRegexp =
  /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u;
const passwordRegexp = /^[a-zA-Z0-9а-яА-Я]+$/;
const nameRegexp = /^[a-zA-Z-\s]+$/;
const cityRegexp = /^[a-zA-Z]+,?\s[a-zA-Z]+$/;
const phoneRegexp = /^\+380\d{9}$/;
const birthdayRegexp =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).min(7).max(32).required(),
  name: Joi.string().pattern(nameRegexp).required(),
  city: Joi.string()
    .pattern(cityRegexp)
    .message("city fails to match the required pattern: city, region")
    .required(),
  phone: Joi.string()
    .pattern(phoneRegexp, "numbers")
    .message("number fails to match the required pattern: +380XXXXXXXXX")
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).min(7).max(32).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp),
  email: Joi.string().pattern(emailRegexp),
  birthday: Joi.string().pattern(birthdayRegexp),
  phone: Joi.string()
    .pattern(phoneRegexp, "numbers")
    .message("number fails to match the required pattern: +380XXXXXXXXX"),
  city: Joi.string()
    .pattern(cityRegexp)
    .message("city fails to match the required pattern: city, region"),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  emailSchema,
};
