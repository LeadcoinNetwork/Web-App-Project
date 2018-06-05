const config = require("../../../app/config");
const { mysqlPool } = require("../../../app/mysql");
const User = require("../../../app/controller/user");
const { Token } = require("../../../app/model");
const expect = require("chai").expect;
const { testUser } = require("../util");
const config = require("../../../app/config");

const request = require("request-promise-native").defaults({
  baseUrl: config.backend,
  resolveWithFullResponse: true
});

describe(`Delete ${config.backend}/user`, () => {
  it("Should delete a user", async () => {
    // first, add a user
    var user = await User.register(testUser);
    var [{ token }] = await Token.find({ user_id: user.id });
    var user = await User.confirmEmail(token);
    var token = await User.login(user.id);

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
