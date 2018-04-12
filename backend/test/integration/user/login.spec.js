const config = require("../../../app/config");
const expect = require("chai").expect;
const { pick, omit } = require("lodash");

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port + config.baseURI,
  resolveWithFullResponse: true
});

describe(`Login ${config.baseURI}/login`, () => {
  it("Should get the user", async () => {
    // first, add a user
    const user = {
      fname: "Bob",
      lname: "Dugla",
      email: "some@mail.com",
      password: "912379233"
    };

    const resCreate = await request.post("/user", {
      json: user
    });

    const resLogin = await request.post("/login", {
      json: pick(user, "email", "password")
    });

    expect(resLogin.statusCode).to.equal(200, JSON.stringify(resLogin.body));
    expect(resLogin.body).to.have.keys("user", "token");
    expect(omit(resLogin.body.user, "login")).to.eql(
      omit(resCreate.body.user, "login")
    );
  });
});
