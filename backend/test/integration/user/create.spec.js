const chaiAsPromised = require("chai-as-promised");
const { omit } = require("lodash");
const { expect } = require("chai").use(chaiAsPromised);
const config = require("../../../app/config");
const User = require("../../../app/controller/user");
const { testUser } = require("../util");

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port + config.baseURI
});

describe(`Create ${config.baseURI}/user`, () => {
  it("Should create a new user", async () => {
    var user = await request.post("/user", {
      json: testUser
    });

    // test http response
    expect(user).to.include(omit(testUser, "password"));

    // test database
    expect(await User.findById(user.id)).to.eql(user);
  });

  it("Should reject duplicate", async () => {
    await User.create(testUser);

    return expect(
      request.post("/user", {
        json: testUser
      })
    ).to.be.rejectedWith(
      '409 - {"error":"Email ' + testUser.email + ' is already in use"}'
    );
  });
});
