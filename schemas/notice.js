const Joi = require("joi");

const dateOfBirthRegExp =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const addNoticeSchema = Joi.object({
  title: Joi.string()
    .pattern(/^[а-яёіїєА-ЯЁІЇЄa-zA-Z0-9]+$/)
    .min(2)
    .max(48),
  name: Joi.string()
    .pattern(/^[а-яёіїєА-ЯЁІЇЄa-zA-Z0-9]+$/)
    .min(2)
    .max(16),
  dateOfBirth: Joi.string().pattern(dateOfBirthRegExp),
  breed: Joi.string()
    .pattern(/^[а-яёіїєА-ЯЁІЇЄa-zA-Z0-9]+$/)
    .min(2)
    .max(24),
  sex: Joi.string().valid("male", "female"),
  location: Joi.string().pattern(
    /^[а-яёіїєА-ЯЁІЇЄa-zA-Z0-9]+,?\s[а-яёіїєА-ЯЁІЇЄa-zA-Z0-9]+$/
  ),
  price: Joi.string(),
  comments: Joi.string().min(8).max(120),
  category: Joi.string().valid("lost-found", "for-free", "sell"),
  petImage: Joi.string(),
});

module.exports = addNoticeSchema;
