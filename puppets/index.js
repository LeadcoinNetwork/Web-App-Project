//@ts-check
const dotenv = require("dotenv")
dotenv.config()
const headless = process.env.HEADLESS === "true" ? true : false
const url = process.env.URL
const puppeteer = require("puppeteer")
const Chance = require("chance")
const inlineManual = require("./inline-manual")

const chance = new Chance()
const user = {
  fname: chance.name(),
  lname: "Puppetsky",
  email: chance.email(),
}

const runner = async () => {
  console.log("Waking up Puppets...")
  const webbrowser = await puppeteer.launch({ headless })
  const mobilebrowser = await puppeteer.launch({ headless })
  const webpage = await webbrowser.newPage()
  const mobilepage = await mobilebrowser.newPage()
  await webpage.goto(url)
  await mobilepage.goto(url)
  const webStatus = inlineManual.web(webpage)
  const mobileStatus = inlineManual.mobile(mobilepage)
  console.log({
    web: await webStatus,
    mobile: await mobileStatus,
  })
  await webbrowser.close()
  await mobilebrowser.close()
}

try {
  runner()
} catch (e) {
  console.error(e)
}