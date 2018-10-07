//@ts-check
const Chance = require("chance")
const chance = new Chance()

module.exports = async page => {
  try {
    let step = 0
    const snapAndClick = async (
      selector = ".inmplayer-popover-button-next",
    ) => {
      await page.screenshot({ path: `slideshow/mobile-${step++}.png` })
      console.log("[MOBILE] took picture " + step + "#")
      await page.click(selector)
      await page.waitFor(500)
    }
    const user_first_name = chance.name()
    const user = {
      fname: user_first_name,
      lname: "Puppetstein",
      email: user_first_name.replace(" ", ".") + "@puppetstore.com",
    }
    await page.setViewport({
      width: 600,
      height: 800,
      isMobile: true,
    })

    console.log("[MOBILE] Puppet is signing-up...")

    // first, we sign up a new user
    await snapAndClick(".sign-link a")
    await page.type(".ldc-textfield.fname", user.fname)
    await page.type(".ldc-textfield.lname", user.lname)
    await page.type(".ldc-textfield.email", user.email)
    await snapAndClick(".sm-form .ldc-button")
    await page.waitForNavigation({ waitUntil: "networkidle0" })

    // wait for inline-manual
    console.log("[MOBILE] Puppet is starting inline-manual...")
    await page.waitForSelector(".inmplayer-firstStep")

    // buy leads
    console.log("[MOBILE] Puppet is learning to buy leads...")
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
    await page.waitForSelector(".ldc-real-estate-lead")
    await snapAndClick(".ldc-real-estate-lead .rel-selector")

    await page.evaluate(() => {
      //@ts-ignore
      const x = document
        .querySelector(".ldc-real-estate-lead .rel-selector")
        .click()
    })

    await snapAndClick(".downStrip button")
    await snapAndClick(".button-container .ldc-button")
    await snapAndClick()
    await snapAndClick()
    await snapAndClick()
    await snapAndClick(".logo .logo-link")
    let currentBalance = await page.evaluate(() => {
      //@ts-ignore
      const balance = document.querySelector(".ldc-balance-widget").innerText
      return balance
    })
    console.log(`[WEB] Puppet has ${currentBalance}`)

    // sell leads
    console.log("[MOBILE] Puppet is learning to sell leads...")
    await snapAndClick(".sell .ldc-button")
    await snapAndClick()
    await snapAndClick(".upload-links .csv-upload")
    await snapAndClick()
    await page.waitForNavigation({ waitUntil: "networkidle0" })
    await snapAndClick()
    await page.waitForSelector(".notification-badge")
    await page.waitForNavigation({ waitUntil: "networkidle0" })
    currentBalance = await page.evaluate(() => {
      //@ts-ignore
      const balance = document.querySelector(".ldc-balance-widget").innerText
      return balance
    })
    console.log(`[WEB] Puppet has ${currentBalance}`)
    await page.evaluate(() =>
      //@ts-ignore
      document.querySelector(".ldc-notification-element").click(),
    )
    await snapAndClick()
    await snapAndClick()
    await page.waitForSelector("#twitter-share")
    await snapAndClick("#twitter-share")
    console.log("[MOBILE] Puppet done")
    return true
  } catch (e) {
    e.scope = "mobile"
    await page.screenshot({ path: `slideshow/mobile-error.png` })
    throw e
  }
}
// await page.screenshot({ path: `slideshow/web-error.png` })
