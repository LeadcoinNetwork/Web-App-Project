//@ts-check
const puppeteer = require("puppeteer")
const Chance = require("chance")

const chance = new Chance()
const user = {
  fname: chance.name(),
  lname: chance.name(),
  email: chance.email(),
}
;(async () => {
  console.log("Puppet starts...")
  const browser = await puppeteer.launch({ headless: true })
  let step = 0
  const page = await browser.newPage()
  const snapAndClick = async (selector = ".inmplayer-popover-button-next") => {
    await page.screenshot({ path: `slideshow/${step++}.png` })
    await page.click(selector)
  }

  await page.goto("http://127.0.0.1.xip.io:8080")
  console.log("Puppet is signing-up...")

  // first, we sign up a new user
  await page.click(".sign-link a")
  await page.type(".ldc-textfield.fname", user.fname)
  await page.type(".ldc-textfield.lname", user.lname)
  await page.type(".ldc-textfield.email", user.email)
  await page.click(".sm-form .ldc-button")
  await page.waitForNavigation({ waitUntil: "networkidle0" })

  // wait for inline-manual
  console.log("Puppet is starting inline-manual...")
  await page.waitForSelector(".inmplayer-firstStep")

  // buy leads
  console.log("Puppet is learning to buy leads...")
  await snapAndClick()
  await snapAndClick()
  await snapAndClick(".buy .ldc-button")
  await page.waitFor(200)
  await page.select(".bl-filters select:nth-child(1)", "Real Estate")
  await page.evaluate(() =>
    document
      .querySelector(".bl-filters select:nth-child(1)")
      .dispatchEvent(new Event("change")),
  )
  await page.select(".bl-filters select:nth-child(2)", "Buy")
  await page.evaluate(() =>
    document
      .querySelector(".bl-filters select:nth-child(2)")
      .dispatchEvent(new Event("change")),
  )
  await snapAndClick(".bl-filters .ldc-button")
  await page.waitForSelector(".t-body .ldc-checkbox")
  await snapAndClick(".t-body .ldc-checkbox")
  await snapAndClick(".lt-results-head button")
  await snapAndClick(".button-container button")
  await snapAndClick()
  await snapAndClick()
  await snapAndClick()
  await snapAndClick(".logo .logo-link")

  // sell leads
  console.log("Puppet is learning to sell leads...")
  await snapAndClick(".sell .ldc-button")
  await snapAndClick()
  await snapAndClick(".upload-links .csv-upload")
  await snapAndClick()
  await page.waitFor(500)
  await snapAndClick()
  await page.waitForSelector(".notification-badge")
  await page.waitFor(2500)
  await page.evaluate(() =>
    document.querySelector(".ldc-notification-element").click(),
  )
  await snapAndClick()
  await snapAndClick()
  await page.waitForSelector("#twitter-share")
  await snapAndClick("#twitter-share")
  await browser.close()
  console.log("Puppet ended without errors")
})()
