let moment = require("moment")

export const Time = {
  format: time => moment(time).format("DD-MM-YYYY hh:MM:ss"),
  fromNow: time => moment(time).fromNow(),
}
