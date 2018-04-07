const config = require("../../app/config");
const mysqlPool = require("../../app/mysql-pool");
const expect = require("chai").expect;

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port,
  resolveWithFullResponse: true
});

describe(`${config.baseURI}/user`, () => {
  it("Should register a new user", done => {
    var user = {
      fname: "John",
      lname: "Doe",
      mail: "john@doe.com",
      pass: "pass"
    };

    request
      .post(`${config.baseURI}/user`, {
        json: user
      })
      .then(res => {
        // test http response
        expect(res.statusCode).to.equal(201, JSON.stringify(res.body));
        expect(res.body).to.include({
          fname: user.fname,
          lname: user.lname,
          mail: user.mail,
          role: "user"
        });

        // test database
        return mysqlPool
          .query("SELECT mail FROM users WHERE mail = ?", user.mail)
          .then(rows => {
            expect(rows)
              .to.be.an("array")
              .that.eql([{ mail: user.mail }]);
            done();
          });
      })
      .catch(done);
  });

  it("Should reject duplicate", done => {
    var user = {
      fname: "John",
      lname: "Doe",
      mail: "john.dup@doe.com",
      pass: "pass"
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
