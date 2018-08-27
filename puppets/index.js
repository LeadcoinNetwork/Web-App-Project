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
  console.log("Puppet starts...")
  const browser = await puppeteer.launch({ headless: false })
  let step = 0
  const page = await browser.newPage()
  await page.goto("http://127.0.0.1.xip.io:8080")
  const snapAndClick = async (selector = ".inmplayer-popover-button-next") => {
    await page.screenshot({ path: `slideshow/${step++}.png` })
    console.log("took picture " + step + "#")
    await page.click(selector)
  }
  await InlineManualMobile(page, snapAndClick)
  await browser.close()
  console.log("Puppet ended without errors")
})()
