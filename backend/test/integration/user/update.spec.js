const config = require("../../../app/config");
const mysqlPool = require("../../../app/db/mysql-pool");
const expect = require("chai").expect;

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port,
  resolveWithFullResponse: true
});

describe(`Update ${config.baseURI}/user`, () => {
  it("Should update the user", async () => {
    // first, add a user
    const user = {
      fname: "Bob",
      lname: "Dugla",
      email: "some@mail.com",
      password: "Pa$$w0rd!"
    };

    const { body: newUser } = await request.post(`${config.baseURI}/user`, {
      json: user
    });

    const updUser = {
      fname: "Alex",
      lname: "Bora",
      email: "bora@email.com",
      password: "newpass",
      role: "admin"
    };

    const res = await request.put(`${config.baseURI}/user/${newUser.id}`, {
      json: updUser
    });

    expect(res.statusCode).to.equal(200, JSON.stringify(res.body));
    expect(res.body).to.include({
      fname: updUser.fname,
      lname: updUser.lname,
      email: updUser.email,
      role: "admin"
    });

    // clean up
    const resDel = await request.delete(`${config.baseURI}/user/${newUser.id}`);
    expect(resDel.statusCode).to.equal(200, JSON.stringify(resDel.body));
  });
});
