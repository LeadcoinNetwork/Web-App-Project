const bcrypt = require("bcrypt");
const { omit } = require("lodash");
const mysqlPool = require("../mysql-pool");
const { pick } = require("lodash");

module.exports = async function(req, res, next) {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).json({
      error: 'Missing request parameter'
    });
  }

  const user = pick(req.body, [
    'mail',
    'fname',
    'lname',
    'role'
  ]);

  if (req.body.pass) {
    user.pass = bcrypt.hashSync(req.body.pass, 10);
  }

  try {
    const dbUpd = await mysqlPool
      .query("UPDATE users SET ? WHERE id = ?", [user, userId]);

    if (dbUpd.affectedRows === 0) {
      res.status(404).json({
        error: 'Not Found'
      });
    } else {
      const dbSel = await mysqlPool
        .query("SELECT * FROM users WHERE id = ?", userId);

      res.status(200).send( // Created
        omit(dbSel[0], 'pass') // omit the pass field
      );
    }
  } catch (err) {
    next(err);
  }
};
