const nodemailer = require("nodemailer");

const { FROM_EMAIL, PASS_FROM_EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: FROM_EMAIL,
    pass: PASS_FROM_EMAIL,
  },
});

module.exports = transporter;
