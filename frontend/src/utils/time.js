let moment = require("moment")
const storage = window.localStorage
export const Time = {
  format: time =>
    moment(time)
      .locale(storage.getItem("current"))
      .format("DD-MM-YYYY hh:MM:ss"),
  fromNow: time =>
    moment(time)
      .locale(storage.getItem("current"))
      .fromNow(),
  localeString: time =>
    new Date(time).toLocaleString(storage.getItem("current")),
}
