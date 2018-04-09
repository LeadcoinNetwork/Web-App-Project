const mysqlPool = require("../mysql-pool");

module.exports = function(req, res, next) {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).json({
      error: 'Missing request parameter'
    });
  }

  mysqlPool
    .query("DELETE FROM users WHERE id = ?", userId)
    .then(status => {
      if (status.affectedRows === 0) {
        res.status(404).json({
          error: 'Not Found'
        });
      } else {
        res.status(200).json({
          ok: true
        });
      }
    })
    .catch(next);
};
