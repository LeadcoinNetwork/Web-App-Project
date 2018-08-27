//@ts-check
const puppeteer = require("puppeteer")
const Chance = require("chance")

const InlineManualWeb = require("./inline-manual/web")
const InlineManualMobile = require("./inline-manual/mobile")

const chance = new Chance()
const user = {
  fname: chance.name(),
  lname: "Puppetsky",
  email: chance.email(),
}
;(async () => {
  console.log("Waking up Puppets...")
  const webbrowser = await puppeteer.launch({ headless: true })
  const mobilebrowser = await puppeteer.launch({ headless: true })
  let step = 0
  const webpage = await webbrowser.newPage()
  const mobilepage = await mobilebrowser.newPage()
  await webpage.goto("http://127.0.0.1.xip.io:8080")
  await mobilepage.goto("http://127.0.0.1.xip.io:8080")
  const webStatus = InlineManualWeb(webpage)
  const mobileStatus = InlineManualMobile(mobilepage)
  console.log({
    web: await webStatus,
    mobile: await mobileStatus,
  })
  await webbrowser.close()
  await mobilebrowser.close()
})()
