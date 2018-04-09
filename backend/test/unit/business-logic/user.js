const { expect } = require("chai");
const User = require("../../../app/business-logic/user");

describe("BusinessLogic.User", () => {
  describe("#validateFirstName", () => {
    it("Throws when string length is not between 2-20 characters", () => {
      expect(() => User.validateFirstName("a")).to.throw();
      expect(() =>
        User.validateFirstName("this is a very long name")
      ).to.throw();
    });
  });

  describe("#validateLastName", () => {
    it("Throws when string length is not between 2-20 characters", () => {
      expect(() => User.validateLastName("a")).to.throw();
      expect(() =>
        User.validateLastName("this is a very long name")
      ).to.throw();
    });
  });

  describe("#validateEmail", () => {
    it("Throws for invalid email", () => {
      expect(() => User.validateEmail("invalid@email")).to.throw();
    });
  });

  describe("#validatePasswordStrength", () => {
    it("Throws for weak password", () => {
      expect(() => User.validatePasswordStrength("12345678")).to.throw();
    });
  });
});
