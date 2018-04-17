const mailer = require("nodemailer-promise");
const { mail: config } = require("../config");

const sendMail = mailer.config({
  host: config.host,
  port: config.port,
  secure: config.secure,
  auth: {
    user: config.user,
    pass: config.pass
  }
});

module.exports = {
  newUser,
  updateEmail
};

function newUser(user) {
  return sendMail({
    to: user.email,
    subject: "Wellcome to Leadcoin Network",
    html:
      "<h2>Hello " +
      user.fname +
      "!</h2>" +
      "<p>Please click " +
      '<a href="http://localhost:3000/api/v1/auth/activate?activation_key=' +
      user.activation_key +
      '">' +
      "here " +
      "</a>" +
      "to confirm your registration" +
      "</p>"
  });
}

function updateEmail(user) {
  return sendMail({
    to: user.email,
    subject: "Email changed",
    html:
      "<h2>Hello " +
      user.fname +
      "!</h2>" +
      "<p>Please confirm your email address " +
      '<a href="http://localhost:3000/api/v1/auth/activate?activation_key=' +
      user.activation_key +
      '">' +
      "here " +
      "</a>" +
      "</p>"
  });
}
