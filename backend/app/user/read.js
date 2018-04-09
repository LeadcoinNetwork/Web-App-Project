const mysqlPool = require("../mysql-pool");

module.exports = function(req, res, next) {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).json({
      error: 'Missing request parameter'
    });
  }

  mysqlPool
    .query("SELECT * FROM users WHERE id = ?", userId)
    .then(rows => {
      var user = rows[0];
      delete user.pass;
      res.json(user);
    })
    .catch(next);
};
