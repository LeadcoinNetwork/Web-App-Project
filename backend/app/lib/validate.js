const zxcvbn = require("zxcvbn");
const Joi = require("joi").extend(joiPassword);
const User = require("../model/user");

module.exports = {
  newUser,
  partialUser,
  uniqueEmail
};

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

function joiPassword(joi) {
  return {
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
          return value;
        }
      }
    ]
  };
}

async function newUser(user) {
  return await Joi.validate(
    user,
    userSchema.requiredKeys("fname", "lname", "email", "password"),
    { abortEarly: false }
  );
}

async function partialUser(user) {
  return await Joi.validate(user, userSchema.min(1), { abortEarly: false });
}

async function uniqueEmail(email, userId) {
  let [user] = await User.find({ email });
  if (user && user.id !== parseInt(userId)) {
    let err = new Error("Email " + email + " is already in use");
    err.status = 409;
    throw err;
  }
}
