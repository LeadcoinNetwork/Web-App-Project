const bcrypt = require("bcrypt");
const validator = require("validator");
const zxcvbn = require("zxcvbn");
const User = require("../model/user");

module.exports = {
  register,
  findByEmail,
  deleteById,
  encryptPassword,
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePasswordStrength,
  validateUserDetails
};

async function register(user) {
  // prevent duplicate
  if (await User.findByEmail(user.email)) {
    var err = new Error("Email " + user.email + " is already in use");
    err.status = 409;
    throw err;
  }

  user = validateUserDetails(user);
  user.password = encryptPassword(user.password);
  user.created = Date.now();

  await User.create(user);

  return await findByEmail(user.email);
}

async function findByEmail(email) {
  var user = await User.findByEmail(email);
  if (user) delete user.password;
  return user;
}

async function deleteById(userId) {
  return await User.deleteById(userId);
}

function encryptPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function validateFirstName(fname) {
  if (typeof fname != "string" || !validator.isLength(fname, 2, 20)) {
    throw new Error("First name must be within 2-20, given " + fname);
  }
  return fname;
}

function validateLastName(lname) {
  if (typeof lname != "string" || !validator.isLength(lname, 2, 20)) {
    throw new Error("Last name must be within 2-20, given " + lname);
  }
  return lname;
}

function validateEmail(email) {
  if (!validator.isEmail(String(email))) {
    throw new Error("Invalid email address, given " + email);
  }
  return email;
}

function validatePasswordStrength(password) {
  if (typeof password != "string" || !zxcvbn(password).score) {
    throw new Error("Password is too weak, given " + password);
  }
  return password;
}

function validateUserDetails(user) {
  return {
    fname: validateFirstName(user.fname),
    lname: validateLastName(user.lname),
    email: validateEmail(user.email),
    password: validatePasswordStrength(user.password)
  };
}
