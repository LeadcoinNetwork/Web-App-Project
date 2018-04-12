const config = require("../../../app/config");
const { mysqlPool } = require("../../../app/mysql");
const expect = require("chai").expect;

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port + config.baseURI,
  resolveWithFullResponse: true
});

describe(`Delete ${config.baseURI}/user`, () => {
  it("Should create a new user", async () => {
    const user = {
      fname: "John",
      lname: "Doe",
      email: "john@doe.com",
      password: "912379233"
    };

    const resCreate = await request.post("/user", {
      json: user
    });

    expect(resCreate.statusCode).to.equal(201, JSON.stringify(resCreate.body));

    const resDelete = await request.delete(`/user/${resCreate.body.user.id}`, {
      auth: { bearer: resCreate.body.token }
    });

    // test http response
    expect(resDelete.statusCode).to.equal(200, JSON.stringify(resCreate.body));

    // test database
    const dbSel = await mysqlPool.query(
      "SELECT * FROM users WHERE id = ?",
      resCreate.body.user.id
    );

    expect(dbSel).to.be.an("array").that.is.empty;
  });
});
