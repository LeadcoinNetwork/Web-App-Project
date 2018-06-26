import * as userAuth from "./user-auth"

test("compate password", () => {
  var valid = userAuth.comparePassword(
    "abcdef",
    "$2b$10$/CSQai9rYX1DwKI3lCJC8.kI26jlYEQ2vZQaiUcIz.hzDYb8.vh/a",
  )
  expect(valid).toBeTruthy()

  var invalid = userAuth.comparePassword(
    "wrong-password",
    "$2b$10$/CSQai9rYX1DwKI3lCJC8.kI26jlYEQ2vZQaiUcIz.hzDYb8.vh/a",
  )
  expect(invalid).toBeFalsy()
})
test("genereate jwt", () => {
  var a = userAuth.generateJWT(50, "mysecret")
  a = a.replace(/\.*/, "")
  expect(a).toMatch(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTU",
  )
})
test("generate token", () => {
  var a = userAuth.generateToken()
  var b = userAuth.generateToken()
  expect(a).not.toEqual(b)
  expect(a.length).toBeGreaterThan(10)
})
test("hash password", () => {
  var hashed = userAuth.hashPassword("abcdef")
  expect(hashed.length).toBeGreaterThan(10)
})
