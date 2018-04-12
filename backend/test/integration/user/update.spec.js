const config = require("../../../app/config");
const { mysqlPool } = require("../../../app/mysql");
const expect = require("chai").expect;

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port + config.baseURI,
  resolveWithFullResponse: true
});

describe(`Update ${config.baseURI}/user`, () => {
  it("Should update the user", async () => {
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

    const updUser = {
      fname: "Alex",
      lname: "Bora",
      email: "bora@email.com",
      password: "912379231",
      role: "admin"
    };

    const resUpd = await request.put(`/user/${resCreate.body.user.id}`, {
      auth: { bearer: resCreate.body.token },
      json: updUser
    });

    expect(resUpd.statusCode).to.equal(200, JSON.stringify(resUpd.body));
    expect(resUpd.body).to.include({
      fname: updUser.fname,
      lname: updUser.lname,
      email: updUser.email,
      role: "admin"
    });
  });
});
