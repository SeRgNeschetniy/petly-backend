const Joi = require("joi");

// const DateOfBirthRegExp = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const addNoticeSchema = Joi.object({
    title: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(2).max(48).required(),
    name: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(2).max(16),
    dateOfBirth: Joi.date().required(),
    breed: Joi.string().pattern(/^[a-zA-Z\s]+$/).min(2).max(24),
    sex: Joi.string().valid('male', 'female'),
    location: Joi.string().pattern(/^[a-zA-Z]+,?\s[a-zA-Z]+$/),
    price: Joi.number().min(1).required(),
    comments: Joi.string().min(8).max(120).required(),
    category: Joi.string().valid('lost-found', 'inGoodHands', 'sell'),
    petImage: Joi.string(),
});

module.exports = addNoticeSchema;