const CronJob = require("cron").CronJob

export const CompleteAuctions = AppLogic =>
  new CronJob("0 */1 * * * *", function() {
    const now = new Date()
    console.log("Cron complete auction start at", now)
    AppLogic.auctions
      .completeAuctions()
      .then(() => console.log("Cron complete auction successful"))
      .catch(err => console.log("Cron complete error: " + err))
  })
