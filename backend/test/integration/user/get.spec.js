const expect = require("chai").expect;
const { omit } = require("lodash");
const User = require("../../../app/controller/user");
const config = require("../../../app/config");

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port + config.baseURI,
  resolveWithFullResponse: true
});

describe(`Get ${config.baseURI}/user`, () => {
  it("Should get the user", async () => {
    // first, add a user
    var user = await User.create({
      fname: "John",
      lname: "Doe",
      email: "john@doe.com",
      password: "912379233"
    });

    user = await User.activateByKey(user.activation_key);
    var { token } = await User.login(user.id);

    const res = await request.get(`/user/${user.id}`, {
      auth: { bearer: token },
      json: true
    });

    expect(res.statusCode).to.equal(200, JSON.stringify(res.body));
    expect(omit(res.body, "login")).to.eql(omit(user, "login"));
  });
});
