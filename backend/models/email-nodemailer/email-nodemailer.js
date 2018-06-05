// external modules
const mailer = require("nodemailer-promise");

// internal modules
const config = require("../../config");

module.exports = mailer.config(config.mail);
