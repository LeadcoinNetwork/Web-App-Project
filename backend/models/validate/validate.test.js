const chaiAsPromised = require("chai-as-promised")
const { expect } = require("chai").use(chaiAsPromised)
const { omit, pick } = require("lodash")
const validate = require("../../../app/lib/validate")

describe("Validate", () => {
  const user = {
    fname: "John",
    lname: "Doe",
    email: "john@doe.com",
    password: "912379233",
  }

  describe("newUser", () => {
    it("Should have `fname`, `lname`, `email`, `password`", () => {
      return Promise.all([
        expect(validate.newUser(user)).to.be.fulfilled,
        expect(validate.newUser(omit(user, "fname"))).to.be.rejected,
        expect(validate.newUser(omit(user, "lname"))).to.be.rejected,
        expect(validate.newUser(omit(user, "email"))).to.be.rejected,
        expect(validate.newUser(omit(user, "password"))).to.be.rejected,
      ])
    })
  })
})
