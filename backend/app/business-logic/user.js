const bcrypt = require("bcrypt");
const validator = require("validator");
const zxcvbn = require("zxcvbn");
const { pick } = require("lodash");
const User = require("../model/user");

module.exports = {
  create,
  findByEmail,
  findById,
  updateById,
  deleteById,
  encryptPassword,
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePasswordStrength
};

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

function validateRole(role) {
  if (typeof role != "string" || !["user", "admin"].includes(role)) {
    throw new Error("Invalid role, given " + role);
  }
  return role;
}

// returns user/undefined
async function create(user) {
  user = pick(user, ["fname", "lname", "email", "password", "role"]);

  user = {
    fname: validateFirstName(user.fname),
    lname: validateLastName(user.lname),
    email: validateEmail(user.email),
    password: validatePasswordStrength(user.password)
  };

  // prevent duplicate
  if (await User.findByEmail(user.email)) {
    var err = new Error("Email " + user.email + " is already in use");
    err.status = 409;
    throw err;
  }

  user.password = encryptPassword(user.password);
  user.created = Date.now();

  await User.create(user);

  return await findByEmail(user.email);
}

// returns user/undefined
async function findByEmail(email) {
  var user = await User.findByEmail(email);
  if (user) delete user.password;
  return user;
}

// returns user/undefined
async function findById(userId) {
  var user = await User.findById(userId);
  if (user) delete user.password;
  return user;
}

// returns user/undefined
async function updateById(userId, user) {
  user = pick(user, ["fname", "lname", "email", "password", "role"]);

  if (user.fname) user.fname = validateFirstName(user.fname);
  if (user.lname) user.lname = validateLastName(user.lname);
  if (user.email) {
    user.email = validateEmail(user.email);
    if (await User.findByEmail(user.email)) {
      var err = new Error("Email " + user.email + " is already in use");
      err.status = 409;
      throw err;
    }
  }

  if (user.password) {
    user.password = validatePasswordStrength(user.password);
    user.password = encryptPassword(user.password);
  }

  if (user.role) user.role = validateRole(user.role);

  await User.updateById(userId, user);

  return await findById(userId);
}

// returns true/false
async function deleteById(userId) {
  return await User.deleteById(userId);
}
