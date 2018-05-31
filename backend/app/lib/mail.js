const mailer = require("nodemailer-promise");
const config = require("../config");
var sendMail;
if (config.mail.mailer == "SMTP") {
  sendMail = mailer.config(config.mail);
} else {
  sendMail = function() {
    console.log("Send Email:");
    console.log(arguments);
    return Promise.resolve();
  };
}

module.exports = {
  confirmEmail,
  confirmEmailUpdate,
  forgotPassword
};

function confirmEmail(user, token) {
  return sendMail({
    to: user.email,
    from: config.mail.from,
    subject: "Welcome to Leadcoin Network",
    html:
      "<h2>Hello " +
      user.fname +
      "!</h2>" +
      "<p>Please click " +
      '<a href="' +
      config.backend +
      "/auth/confirm-email?token=" +
      token +
      '">' +
      "here " +
      "</a>" +
      "to confirm your registration" +
      "</p>"
  });
}

function confirmEmailUpdate(user, token) {
  return sendMail({
    to: user.email,
    subject: "Email changed",
    html:
      "<h2>Hello " +
      user.fname +
      "!</h2>" +
      "<p>Please confirm your new email address " +
      '<a href="' +
      config.backend +
      "/auth/confirm-email-update?token=" +
      token +
      '">' +
      "here " +
      "</a>" +
      "</p>"
  });
}

function forgotPassword(user, token) {
  return sendMail({
    to: user.email,
    subject: "Reset Password",
    html:
      "<h2>Hello " +
      user.fname +
      "!</h2>" +
      "<p>Please click " +
      '<a href="' +
      config.backend +
      "/auth/reset-password?token=" +
      token +
      '">' +
      "here " +
      "</a>" +
      "to choose a new password" +
      "</p>"
  });
}
