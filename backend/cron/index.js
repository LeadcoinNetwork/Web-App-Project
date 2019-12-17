const CronJob = require("../lib/cron.js").CronJob

const job = new CronJob("0 */10 * * * *", function() {
  const d = new Date()
  console.log("Every Tenth Minute:", d)
})

job.start()
