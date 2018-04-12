const config = require("../../app/config");
const { mysqlPool } = require("../../app/mysql");
const server = require("../../app/server");

after(async () => {
  // clean up environment
  server.close();
  /*  mysqlPool
    .query("DROP DATABASE " + config.mysql.database)
    .catch(console.error)
    .then(() => {
      return mysqlPool.end(); // close all connections
    })
    .then(done);*/
  await mysqlPool.end();
});

afterEach(async () => {
  await mysqlPool.query("TRUNCATE users");
});
