import Users from "./users"
import * as Chance from "chance"
import { NewUserInterface } from "./types"
import config from "../../app-logic/config"
var chance = Chance()

import SQL from "../mysql-pool/mysql-pool"
var users = new Users(new SQL(config))

beforeEach(async () => {
  await users.deleteAll()
})

test("createUser", async () => {
  var user_id = await users.createUser({
    disabled: null,
    email: chance.email(),
    fname: "first name",
    lname: "last name",
    plainPassword: "my plain password",
  })
  expect(typeof user_id).toEqual("number")
})

test("getOne (remove created, id from snapshot)", async () => {
  var user_id = await users.createUser({
    disabled: null,
    email: "example_email@example_email.com",
    fname: "first name",
    lname: "last name",
    plainPassword: "my plain password",
  })
  var user = await users.tryGetById(user_id)
  if (user instanceof NotFound) {
    throw new Error("user should be found")
  }
  delete user.password
  delete user.created
  delete user.id
  expect(user).toMatchSnapshot()
})
// test.skip("create a user with missing requried parameter", done => {
//   var p = users.createUser(<NewUserInterface>{})
//   p.catch(() => {
//     done()
//   })
//   p.then(() => {
//     done(new Error("should not be resolved"))
//   })
// })

test("getUserByEmailAndPassword (remove id,created,password from snapshot)", async () => {
  await users.createUser({
    email: "myemail5@myemail.com",
    plainPassword: "a12345",
    disabled: null,
    fname: "",
    lname: "",
  })
  var user = await users.getUserByEmailAndPassword(
    "myemail5@myemail.com",
    "a12345",
  )
  expect(user).not.toBeInstanceOf(NotFound)
  if (!(user instanceof NotFound)) {
    delete user.password
    delete user.created
    delete user.id
  }
  expect(user).toMatchSnapshot()
})

import NotFound from "../../utils/not-found"

test("increaseBalance and decreaseBalance should work", async () => {
  var user_id = await users.createUser({
    email: "myemail@myemail.com",
    plainPassword: "a12345",
    disabled: null,
    fname: "",
    lname: "",
    balance: 0,
  })

  await users.increaseBalance(user_id, 20)
  var t1 = await users.getUserByEmailAndPassword(
    "myemail@myemail.com",
    "a12345",
  )
  expect(t1.balance).toBe(20)
  await users.decreaseBalance(user_id, 10)
  var t1 = await users.getUserByEmailAndPassword(
    "myemail@myemail.com",
    "a12345",
  )
  expect(t1.balance).toBe(10)
})

test("setNewPassword, and not found the user (remove password,created,id from snapshot)", async () => {
  var user_id = await users.createUser({
    email: "myemail@myemail.com",
    plainPassword: "a12345",
    disabled: null,
    fname: "",
    lname: "",
  })

  await users.setNewPassword(user_id, "new-a123")

  var t1 = await users.getUserByEmailAndPassword(
    "myemail@myemail.com",
    "a12345",
  )
  expect(t1).toBeInstanceOf(NotFound)
})

test("setNewPassword, and getUserByEmailAndPassword (remove password,created,id from snapshot)", async () => {
  var user_id = await users.createUser({
    email: "myemail22@myemail.com",
    plainPassword: "a12345",
    disabled: null,
    fname: "",
    lname: "",
  })

  await users.setNewPassword(user_id, "new-a123")
  var t1 = await users.getUserByEmailAndPassword(
    "myemail22@myemail.com",
    // "a12345",
    "new-a123",
  )

  if (t1 instanceof NotFound) {
    throw new Error("should found the user")
  } else {
    delete t1.password
    delete t1.created
    delete t1.id
    expect(t1).toMatchSnapshot()
  }
})
