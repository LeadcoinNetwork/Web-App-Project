const config = require("../../../app/config");
const { mysqlPool } = require("../../../app/mysql");
const expect = require("chai").expect;

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port,
  resolveWithFullResponse: true
});

describe(`Create ${config.baseURI}/user`, () => {
  it("Should create a new user", async () => {
    const user = {
      fname: "John",
      lname: "Doe",
      email: "john@doe.com",
      password: "912379233"
    };

    const resCreate = await request.post(`${config.baseURI}/user`, {
      json: user
    });

    // test http response
    const newUser = resCreate.body;
    expect(resCreate.statusCode).to.equal(201, JSON.stringify(newUser));
    expect(newUser).to.include({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      role: "user"
    });

    // test database
    const dbSel = await mysqlPool.query(
      "SELECT email FROM users WHERE id = ?",
      newUser.id
    );

    expect(dbSel)
      .to.be.an("array")
      .that.eql([{ email: user.email }]);

    // clean up
    const resDel = await request.delete(`${config.baseURI}/user/${newUser.id}`);
    expect(resDel.statusCode).to.equal(200, JSON.stringify(resDel.body));
  });

  it("Should reject duplicate", done => {
    const user = {
      fname: "John",
      lname: "Doe",
      email: "john.dup@doe.com",
      password: "912379233"
    };

    request
      .post(`${config.baseURI}/user`, {
        json: user
      })
      .then(res => {
        // test http response
        expect(res.statusCode).to.equal(201, JSON.stringify(res.body));

        return request
          .post(`${config.baseURI}/user`, {
            json: user,
            simple: false // don't reject for the expected 409 status code
          })
          .then(res => {
            // test http response
            expect(res.statusCode).to.equal(409, JSON.stringify(res.body));

            done();
          });
      })
      .catch(done);
  });
});
