var moment = require("moment");
function format(time) {
  return moment(time).format("DD-MM-YYYY hh:MM:ss");
}

export var format;
