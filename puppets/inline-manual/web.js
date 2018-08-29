const Chance = require("chance")
const chance = new Chance()

module.exports = async page => {
  let step = 0
  const snapAndClick = async (selector = ".inmplayer-popover-button-next") => {
    await page.screenshot({ path: `slideshow/web-${step++}.png` })
    console.log("[WEB] took picture " + step + "#")
    await page.click(selector)
    await page.waitFor(500)
  }

  const user = {
    fname: chance.name(),
    lname: "Puppetsky",
    email: chance.email(),
  }
  await page.setViewport({
    width: 800,
    height: 600,
    isMobile: false,
  })

  console.log("[WEB] Puppet is signing-up...")

  // first, we sign up a new user
  await snapAndClick(".sign-link a")
  await page.type(".ldc-textfield.fname", user.fname)
  await page.type(".ldc-textfield.lname", user.lname)
  await page.type(".ldc-textfield.email", user.email)
  await snapAndClick(".sm-form .ldc-button")
  await page.waitForNavigation({ waitUntil: "networkidle0" })

  // wait for inline-manual
  console.log("[WEB] Puppet is starting inline-manual...")
  await page.waitForSelector(".inmplayer-firstStep")

  // buy leads
  console.log("[WEB] Puppet is learning to buy leads...")
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
  let currentBalance = await page.evaluate(() => {
    const balance = document.querySelector(".ldc-balance-widget").innerText
    return balance
  })
  console.log(`[WEB] Puppet has ${currentBalance}`)
  // sell leads
  console.log("[WEB] Puppet is learning to sell leads...")
  await snapAndClick(".sell .ldc-button")
  await snapAndClick()
  await snapAndClick(".upload-links .csv-upload")
  await snapAndClick()
  await page.waitFor(500)
  await snapAndClick()
  await page.waitForSelector(".notification-badge")
  await page.waitFor(1500)
  currentBalance = await page.evaluate(() => {
    const balance = document.querySelector(".ldc-balance-widget").innerText
    return balance
  })
  console.log(`[WEB] Puppet has ${currentBalance}`)
  await page.evaluate(() =>
    document.querySelector(".ldc-notification-element").click(),
  )
  await snapAndClick()
  await snapAndClick()
  await page.waitForSelector("#twitter-share")
  await snapAndClick("#twitter-share")
  console.log("[WEB] Puppet done")
  return true
}
