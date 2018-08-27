//@ts-check
const dotenv = require("dotenv")
dotenv.config()
console.log(process.env)
const headless = process.env.HEADLESS === "true" ? true : false
const url = process.env.URL
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
  const webbrowser = await puppeteer.launch({ headless })
  const mobilebrowser = await puppeteer.launch({ headless })
  let step = 0
  const webpage = await webbrowser.newPage()
  const mobilepage = await mobilebrowser.newPage()
  await webpage.goto(url)
  await mobilepage.goto(url)
  const webStatus = InlineManualWeb(webpage)
  const mobileStatus = InlineManualMobile(mobilepage)
  console.log({
    web: await webStatus,
    mobile: await mobileStatus,
  })
  await webbrowser.close()
  await mobilebrowser.close()
})()
