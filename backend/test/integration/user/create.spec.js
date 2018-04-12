const config = require("../../../app/config");
const { mysqlPool } = require("../../../app/mysql");
const { omit } = require("lodash");
const expect = require("chai").expect;

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port + config.baseURI,
  resolveWithFullResponse: true
});

describe(`Create ${config.baseURI}/user`, () => {
  const user = {
    fname: "John",
    lname: "Doe",
    email: "john@doe.com",
    password: "912379233"
  };

  it("Should create a new user", async () => {
    const res = await request.post("/user", {
      json: user
    });

    // test http response
    expect(res.statusCode).to.equal(201, JSON.stringify(res.body));
    expect(res.body).to.have.keys("user", "token");
    expect(res.body.user).to.include({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      role: "user"
    });

    // test database
    const [dbUser] = await mysqlPool.query(
      "SELECT * FROM users WHERE id = ?",
      res.body.user.id
    );

    expect(omit(dbUser, "password", "login"))
      .to.be.an("object")
      .that.eql(omit(res.body.user, "login"));
  });

  it("Should reject duplicate", async () => {
    const resCreate = await request.post("/user", {
      json: user
    });

    // test http response
    expect(resCreate.statusCode).to.equal(201, JSON.stringify(resCreate.body));

    const resDup = await request.post("/user", {
      json: user,
      simple: false // don't reject for the expected 409 status code
    });

    // test http duplicate response
    expect(resDup.statusCode).to.equal(409, JSON.stringify(resCreate.body));
  });
});
