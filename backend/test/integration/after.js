const config = require("../../app/config");
const { mysqlPool } = require("../../app/db");
const server = require("../../app/server");

after(done => {
  // clean up environment
  server.close();
  mysqlPool
    .query("DROP DATABASE " + config.mysql.database)
    .catch(console.error)
    .then(() => {
      return mysqlPool.end(); // close all connections
    })
    .then(done);
});
