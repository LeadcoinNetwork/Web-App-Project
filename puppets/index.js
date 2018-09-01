//@ts-check
const dotenv = require("dotenv")
dotenv.config()
const headless = process.env.HEADLESS === "true" ? true : false
const url = process.env.URL
const delay = parseInt(process.env.DELAY)
const inlineManual = require("./inline-manual")
const fs = require("fs")
const path = require("path")
const directory = "./slideshow"
const runner = require('./runner')({
  instructions: inlineManual,
  headless, 
  delay, 
  url,
})

const server = require('./server')

const job = {
  "inline-manual": inlineManual,
}

const clear_files = async () => {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) reject(err)
      let file_number = files.length
      if (files.length == 0) resolve()
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) reject(err)
          file_number--
          if (file_number < 1) resolve()
        })
      }
    })
  })
}


const [node, indexjs, command] = process.argv
if (command==="server") {
  console.log("Server Running")
  console.log({ url, delay })
  let state
  const get_state = () => state
  server(get_state)
  let runner_interval = setInterval(async e => {
    await clear_files()
    state = await runner()
  }, delay)
  process.on("exit", async () => {
    console.log("Shutting Puppets Down")
    clearInterval(runner_interval)
  })
  if (delay > 30000)
    clear_files().then( async () => state = await runner())
} else {
  let test = async () => {
    console.log("Single Test Running")
    console.log({url})
    const exit_code = (await runner()).error ? 0 : 1
    process.exit(exit_code)
  }
  test()
}