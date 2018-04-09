const config = require("../../../app/config");
const expect = require("chai").expect;

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port,
  resolveWithFullResponse: true
});

describe(`Get ${config.baseURI}/user`, () => {
  it("Should get the user", async () => {
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

    const res = await request.get(`${config.baseURI}/user/${newUser.id}`, {
      json: true
    });

    expect(res.statusCode).to.equal(200, JSON.stringify(res.body));
    expect(res.body).to.eql(newUser);

    // clean up
    const resDel = await request.delete(`${config.baseURI}/user/${newUser.id}`);
    expect(resDel.statusCode).to.equal(200, JSON.stringify(resDel.body));
  });
});
