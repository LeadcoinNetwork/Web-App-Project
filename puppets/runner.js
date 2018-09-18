//@ts-check
const puppeteer = require("puppeteer")

module.exports = ({ headless, instructions, url }) => {
  return async ({
    tourist = true,
    overrideInstructions = null,
    emulateDevice = null,
  }) => {
    let state
    console.log("Waking up Puppets...")
    const webbrowser = await puppeteer.launch({ headless })
    const mobilebrowser = await puppeteer.launch({ headless })
    console.log("Running Puppets")
    const webpage = await webbrowser.newPage()
    const mobilepage = await mobilebrowser.newPage()
    if (!tourist) {
      //@ts-ignore
      webpage.screenshot = async () => {}
      //@ts-ignore
      mobilepage.screenshot = async () => {}
    }
    if (overrideInstructions) instructions = overrideInstructions

    if (emulateDevice) {
      mobilepage.emulate(emulateDevice)
    }

    const started = new Date()
    await webpage.goto(url)
    await mobilepage.goto(url)
    const web = instructions.web(webpage)
    const mobile = instructions.mobile(mobilepage)
    try {
      state = {
        started,
        finished: new Date(),
        web: await web,
        mobile: await mobile,
      }
    } catch (e) {
      console.log(e)
      state = {
        error: true,
        scope: e.scope,
        started,
        finished: new Date(),
        e: e.message,
      }
    }
    console.log({ state })
    await webbrowser.close()
    await mobilebrowser.close()
    return state
  }
}
