const config = require("../../app/config");

const testUser = {
  fname: "John",
  lname: "Doe",
  email: config.mail.auth.user,
  password: "912379233"
};

module.exports = {
  testUser
};
