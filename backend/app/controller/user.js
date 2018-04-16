const bcrypt = require("bcrypt");
const auth = require("../lib/auth");
const validate = require("../lib/validate");
const User = require("../model/user");

module.exports = {
  create,
  findByEmail,
  findById,
  updateById,
  deleteById,
  login,
  activateByKey
};

// returns user/undefined
async function create(user) {
  user = await validate.newUser(user);

  await validate.preventDuplicateEmail(user.email);

  user.password = auth.hashPassword(user.password);
  user.created = Date.now();
  user.role = "user";
  user.activation_key = auth.generateActivationKey(user.email);
  user.disabled = "NOT_ACTIVATED_BY_EMAIL";

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

async function login(userId) {
  let user = await findById(userId);
  if (user.disabled) {
    return { error: user.disabled };
  }

  // update login timestamp
  await User.updateById(user.id, { login: Date.now() });

  let token = auth.generateJWT(user);
  return { token };
}

// returns user/false
async function activateByKey(key) {
  if (!key) throw new Error("No activation key");
  let user = await User.findByActivationKey(key);
  if (!user) return false;

  await User.updateById(user.id, {
    activation_key: null,
    disabled: null
  });
  return await findById(user.id);
}
