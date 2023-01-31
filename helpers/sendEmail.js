const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, FROM_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: FROM_EMAIL };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
