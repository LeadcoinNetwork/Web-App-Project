const config = require("../../../app/config");
const { mysqlPool } = require("../../../app/mysql");
const User = require("../../../app/controller/user");
const expect = require("chai").expect;
const { testUser } = require("../util");

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port + config.baseURI,
  resolveWithFullResponse: true
});

describe(`Delete ${config.baseURI}/user`, () => {
  it("Should delete a user", async () => {
    // first, add a user
    var user = await User.create(testUser);

    user = await User.activateByKey(user.activation_key);
    var { token } = await User.login(user.id);

    const res = await request.delete(`/user/${user.id}`, {
      auth: { bearer: token }
    });

    // test http response
    expect(res.statusCode).to.equal(200, JSON.stringify(res.body));

    // test database
    const dbSel = await mysqlPool.query(
      "SELECT * FROM users WHERE id = ?",
      user.id
    );

    expect(dbSel).to.be.an("array").that.is.empty;
  });
});
