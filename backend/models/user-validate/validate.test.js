const { omit, pick } = require("lodash")
const validate = require("./user-validate")

const user = {
  fname: "John",
  lname: "Doe",
  email: "john@doe.com",
  password: "912379233",
}

test("Should have `fname`, `lname`, `email`, `password`", async () => {
  expect(
    (await validate.checkNewUserValid(omit(user, "fname"))) instanceof Error,
  ).toBeTruthy()
})
