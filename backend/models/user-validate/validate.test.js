const { omit, pick } = require("lodash")
const validate = require("./user-validate")

const user = {
  fname: "John",
  lname: "Doe",
  email: "john@doe.com",
  password: "912379233",
}

test("Should have `fname`, `lname`, `email`, `password`", () => {
    expect(validate.newUser(omit(user, "fname"))).to.be.rejected,
    expect(validate.newUser(omit(user, "lname"))).to.be.rejected,
    expect(validate.newUser(omit(user, "email"))).to.be.rejected,
    expect(validate.newUser(omit(user, "password"))).to.be.rejected,
  ])
})
