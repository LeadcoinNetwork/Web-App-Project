const chaiAsPromised = require("chai-as-promised");
const { expect } = require("chai").use(chaiAsPromised);
const { omit } = require("lodash");
const config = require("../../../app/config");
const User = require("../../../app/controller/user");
const { Token } = require("../../../app/model");
const { testUser } = require("../util");

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port + config.baseURI
});

describe(`Login ${config.baseURI}/auth/login`, () => {
  const { email, password } = testUser;

  it("Should return a JSON Web Token", async () => {
    // first, add a user
    var dbUser = await User.register(testUser);
    var [{ token }] = await Token.find({ user_id: dbUser.id });
    var dbUser = await User.confirmEmail(token);

    var { user, token } = await request.post("/auth/login", {
      json: { email, password }
    });

    expect(token).to.be.a("string");
    expect(user).to.eql(dbUser);
  });

  it("Should reject if user is disabled", async () => {
    // first, add a user
    var dbUser = await User.register(testUser);
    var [{ token }] = await Token.find({ user_id: dbUser.id });

    return expect(
      request.post("/auth/login", {
        json: { email, password }
      })
    ).to.be.rejectedWith('403 - {"error":"EMAIL_NOT_VERIFIED"}');
  });
});
