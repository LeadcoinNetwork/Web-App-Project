const bcrypt = require("bcrypt");
const auth = require("../lib/auth");
const validate = require("../lib/validate");
const User = require("../model/user");

module.exports = {
  create,
  findByEmail,
  findById,
  updateById,
  deleteById
};

// returns user/undefined
async function create(user) {
  user = await validate.newUser(user);

  await validate.preventDuplicateEmail(user.email);

  user.password = auth.hashPassword(user.password);
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
  user = await validate.updateUser(user);

  await validate.preventDuplicateEmail(user.email);

  if (user.password) {
    user.password = auth.hashPassword(user.password);
  }

  await User.updateById(userId, user);

  return await findById(userId);
}

// returns true/false
async function deleteById(userId) {
  return await User.deleteById(userId);
}
