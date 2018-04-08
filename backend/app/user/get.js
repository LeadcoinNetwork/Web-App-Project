const mysqlPool = require("../mysql-pool");

module.exports = function(req, res, next) {
  var { mail } = req.body;

  mysqlPool
    .query("SELECT * FROM users WHERE mail = ?", mail)
    .then(rows => {
      var user = rows[0];
      delete user.pass;
      res.json(user);
    })
    .catch(next);
};
