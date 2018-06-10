const auth = require("./auth")
const validate = require("./validate")
const mail = require("../email/email")
const Token = require("../token-mysql/token-mysql")
const User = require("./user-mysql")

module.exports = {
  insert,
  find,
  remove,
  login,
  register,
  confirmEmail,
  resendEmail,
  authenticatePassword,
  update,
  confirmEmailUpdate,
  forgotPassword,
  updateExternal
}

// returns user
async function insert(user) {
  let { email } = user
  await uniqueEmail(email)

  user.created = Date.now()
  await User.insert(user)
  ;[user] = await find({ email })
  return user
}

// returns [user]
async function find(condition, fields) {
  let users = await User.find(condition, fields)
  users = users.map(user => {
    delete user.password
    return user
  })
  return users
}

// returns true/false
async function remove(userId) {
  return await User.remove(userId)
}

async function login(userId) {
  let [user] = await find({ id: userId })
  let token = auth.generateJWT(user)
  if (user.disabled) {
    return token
  }

  // update login timestamp
  await User.update(user.id, { login: Date.now() })

  return token
}

// ----------------------------- ONLY LOCAL USERS -----------------------------

// returns user
async function register(user) {
  user = await validate.newUser(user)

  let { email } = user

  user.password = auth.hashPassword(user.password)
  user.disabled = "EMAIL_NOT_VERIFIED"
  let token = auth.generateToken()

  user = await insert(user)

  await Token.insert({
    user_id: user.id,
    token: token,
    created: Date.now()
  })

  await mail.confirmEmail(user, token)

  return user
}

// returns user
async function resendEmail(token) {
  let [user] = await Token.find({ token })
  if (!user) {
    let err = new Error("Not Found")
    err.status = 404
    throw err
  }
  await mail.confirmEmail(user, token)
  return user
}

// returns user
async function confirmEmail(token) {
  let [{ user_id: userId }] = await Token.find({ token })
  if (!userId) {
    let err = new Error("Not Found")
    err.status = 404
    throw err
  }
  await Token.remove(userId)
  await User.update(userId, { disabled: null })
  let [user] = await find({ id: userId })
  return user
}

// returns user
async function authenticatePassword(email, password) {
  let [user] = await User.find({ email })
  if (user && auth.comparePassword(password, user.password)) {
    delete user.password
    return user
  } else {
    let err = new Error("Unauthorized")
    err.status = 401
    throw err
  }
}

// returns user
async function update(userId, user) {
  user = await validate.partialUser(user)
  let { email, password } = user

  if (password) {
    password = auth.hashPassword(password)
  }

  if (email) {
    await uniqueEmail(email, userId)
    let token = auth.generateToken()
    await Token.insert({
      user_id: userId,
      token: token,
      pending_email: email,
      created: Date.now()
    })
    await mail.confirmEmailUpdate(user, token)
    delete user.email
  }

  await User.update(userId, user)
  ;[user] = await find({ id: userId })
  return user
}

// returns undefined
async function confirmEmailUpdate(token) {
  let { user_id: userId, pending_email: email } = await Token.find({ token })
  await User.update(userId, { email })
  await Token.remove(token)
}

// returns undefined
async function forgotPassword(email) {
  let [user] = find({ email })
  if (!user) {
    let err = new Error("Not Found")
    err.status = 404
    throw err
  }
  let token = auth.generateToken()
  await Token.insert({
    user_id: user.id,
    token: token,
    created: Date.now()
  })
  await mail.forgotPassword(user, token)
}

// returns user
async function resetPassword(token, password) {
  let { user_id: userId } = await Token.find({ token })
  let user = await update(userId, { password })
  await Token.remove(token)
  return user
}

//  --------------------------- ONLY EXTERNAL USERS ---------------------------

// returns user
async function updateExternal(userId, user) {
  let { email } = user
  if (email) {
    await uniqueEmail(email)
  }
  await User.update(userId, user)
  ;[user] = await find({ id: userId })
  return user
}

async function uniqueEmail(email, userId) {
  let [user] = await User.find({ email })
  if (user && user.id !== parseInt(userId)) {
    let err = new Error("Email " + email + " is already in use")
    err.status = 409
    throw err
  }
}
