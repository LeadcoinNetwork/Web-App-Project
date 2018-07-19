let moment = require("moment")
const storage = window.localStorage

export const format = time =>
  moment(time)
    .locale(storage.getItem("current"))
    .format("DD-MM-YYYY hh:MM:ss")

export const fromNow = time =>
  moment(time)
    .locale(storage.getItem("current"))
    .fromNow()

export const localeString = time =>
  new Date(time).toLocaleString(storage.getItem("current"))
