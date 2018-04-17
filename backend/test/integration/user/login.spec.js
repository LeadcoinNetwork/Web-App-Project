const chaiAsPromised = require("chai-as-promised");
const { expect } = require("chai").use(chaiAsPromised);
const { omit } = require("lodash");
const config = require("../../../app/config");
const User = require("../../../app/controller/user");
const { testUser } = require("../util");

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port + config.baseURI
});

describe(`Login ${config.baseURI}/auth/login`, () => {
  const { email, password } = testUser;

  var dbUser;

  beforeEach(async () => {
    // add a user
    dbUser = await User.create(testUser);
  });

  it("Should return a JSON Web Token", async () => {
    dbUser = await User.activateByKey(dbUser.activation_key);
    var { user, token } = await request.post("/auth/login", {
      json: { email, password }
    });

    expect(token).to.be.a("string");
    expect(user).to.eql(dbUser);
  });

  it("Should reject if user is disabled", () => {
    return expect(
      request.post("/auth/login", {
        json: { email, password }
      })
    ).to.be.rejectedWith('401 - {"error":"EMAIL_NOT_VERIFIED"}');
  });
});
