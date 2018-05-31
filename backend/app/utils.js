var fs = require("fs");
var dotenv = require("dotenv");
var _ = require("lodash");

module.exports = {
  throwOnMissingEnvironmentVariables: function() {
    REQUIRED_KEYS = dotenv.parse(fs.readFileSync("./.env.example"));
    var MISSING_VARS = _.keys(_.omit(REQUIRED_KEYS, _.keys(process.env)));
    if (MISSING_VARS.length > 0) {
      throw new Error(
        "Some process environments variables are defined in .env.example but did not exist: \n" +
          MISSING_VARS.join("\n") +
          "\n\n"
      );
    }
  }
};
