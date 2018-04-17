const config = require("../../../app/config");
const { mysqlPool } = require("../../../app/mysql");
const User = require("../../../app/controller/user");
const expect = require("chai").expect;
const { testUser } = require("../util");

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port + config.baseURI,
  resolveWithFullResponse: true
});

describe(`Update ${config.baseURI}/user`, () => {
  it("Should update the user", async () => {
    // first, add a user
    var user = await User.create(testUser);

    user = await User.activateByKey(user.activation_key);
    var { token } = await User.login(user.id);

    const updUser = {
      fname: "Alex",
      lname: "Bora",
      email: testUser.email,
      password: "912379231",
      role: "admin"
    };

    const res = await request.put(`/user/${user.id}`, {
      auth: { bearer: token },
      json: updUser
    });

    expect(res.statusCode).to.equal(200, JSON.stringify(res.body));
    expect(res.body).to.include({
      fname: updUser.fname,
      lname: updUser.lname,
      email: updUser.email,
      role: "admin"
    });
  });
});
