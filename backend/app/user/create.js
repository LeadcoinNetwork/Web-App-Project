const bcrypt = require("bcrypt");
const { omit } = require("lodash");
const mysqlPool = require("../mysql-pool");

module.exports = async function(req, res, next) {
  const user = {
    fname: req.body.fname,
    lname: req.body.lname,
    pass: bcrypt.hashSync(req.body.pass, 10),
    mail: req.body.mail,
    created: Date.now() / 1000
  };

  try {
    const dbIns = await mysqlPool
      .query("INSERT INTO users SET ?", user);

    const dbSel = await mysqlPool
      .query("SELECT * FROM users WHERE id = ?", dbIns.insertId);

    res.status(201).send( // Created
      omit(dbSel[0], 'pass') // omit the pass field
    );
  } catch(err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(409).json({
        error: err.sqlMessage
      });
    } else {
      next(err);
    }
  }


};
