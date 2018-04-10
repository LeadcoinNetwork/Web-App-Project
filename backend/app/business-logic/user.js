const bcrypt = require("bcrypt");
const validator = require("validator");
const zxcvbn = require("zxcvbn");
const { pick } = require("lodash");
const User = require("../model/user");

const Joi = require("joi").extend(joi => ({
  name: "password",
  language: {
    strong: "is too weak"
  },
  rules: [
    {
      name: "strong",
      validate(params, value, state, options) {
        if (zxcvbn(value).score < 2) {
          return this.createError(
            "password.strong",
            { v: value },
            state,
            options
          );
        }
        return value; // Everything is OK
      }
    }
  ]
}));

const userSchema = Joi.object().keys({
  fname: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .label("First name"),
  lname: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .label("Last name"),
  email: Joi.string()
    .email()
    .label("Email"),
  password: Joi.password()
    .strong()
    .label("Password"),
  role: Joi.string()
    .only("user", "admin")
    .label("Role")
});

module.exports = {
  create,
  findByEmail,
  findById,
  updateById,
  deleteById,
  encryptPassword
};

function encryptPassword(password) {
  return bcrypt.hashSync(password, 10);
}

async function preventDuplicatedEmail(email) {
  if (await User.findByEmail(email)) {
    let err = new Error("Email " + email + " is already in use");
    err.status = 409;
    throw err;
  }
}

// returns user/undefined
async function create(user) {
  let validation = userSchema.requiredKeys(
    "fname",
    "lname",
    "email",
    "password"
  );
  user = await Joi.validate(user, validation, { abortEarly: false });

  await preventDuplicatedEmail(user.email);

  user.password = encryptPassword(user.password);
  user.created = Date.now();

  await User.create(user);

  return await findByEmail(user.email);
}

// returns user/undefined
async function findByEmail(email) {
  let user = await User.findByEmail(email);
  if (user) delete user.password;
  return user;
}

// returns user/undefined
async function findById(userId) {
  let user = await User.findById(userId);
  if (user) delete user.password;
  return user;
}

// returns user/undefined
async function updateById(userId, user) {
  let validation = userSchema.min(1); // at least one field to update
  user = await Joi.validate(user, validation, { abortEarly: false });

  await preventDuplicatedEmail(user.email);

  if (user.password) {
    user.password = encryptPassword(user.password);
  }

  await User.updateById(userId, user);

  return await findById(userId);
}

// returns true/false
async function deleteById(userId) {
  return await User.deleteById(userId);
}
