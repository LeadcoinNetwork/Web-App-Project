const bcrypt = require("bcrypt");
const mysqlPool = require("../mysql-pool");

module.exports = function(req, res, next) {
  var user = {
    fname: req.body.fname,
    lname: req.body.lname,
    pass: bcrypt.hashSync(req.body.pass, 10),
    mail: req.body.mail,
    created: Date.now() / 1000
  };

  mysqlPool
    .query("INSERT INTO users SET ?", user)
    .then(() => {
      res.status(201); // Created
      next();
      return null; // suppress bluebird warning. see http://goo.gl/rRqMUw
    })
    .catch(err => {
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).json({
          error: err.sqlMessage
        });
      } else {
        next(err);
      }
    });
};
