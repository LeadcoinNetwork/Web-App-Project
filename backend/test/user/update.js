const config = require('../../app/config');
const mysqlPool = require('../../app/mysql-pool');
const expect = require('chai').expect;

const request = require('request-promise-native').defaults({
  baseUrl: 'http://localhost:' + config.app.port,
  resolveWithFullResponse: true
});

describe(`Update ${config.baseURI}/user`, () => {
  it('Should update the user', async () => {
    // first, add a user
    const user = {
      fname: "Bob",
      lname: "Dugla",
      mail: "some@mail.com",
      pass: "pass"
    };
    const addRes = await request.post(`${config.baseURI}/user`, {
      json: user
    });
    const newUser = addRes.body;

    const updUser = {
      mail: 'bora@email.com',
      fname: 'Alex',
      lname: 'Bora',
      pass: 'newpass',
      role: 'admin'
    };

    const res = await request
      .put(`${config.baseURI}/user/${newUser.id}`, {
        json: updUser,
        simple: false // don't reject for the expected status code
      });

    expect(res.statusCode).to.equal(200, JSON.stringify(res.body));
    expect(res.body).to.include({
      mail: updUser.mail,
      fname: updUser.fname,
      lname: updUser.lname,
      mail: updUser.mail,
      role: 'admin'
    });

    // clean up
    const resDel = await request.delete(`${config.baseURI}/user/${newUser.id}`);
    expect(resDel.statusCode).to.equal(200, JSON.stringify(resDel.body));
  });

});
