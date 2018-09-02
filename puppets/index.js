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
  const server = require('./server')
  console.log("Server Running")
  console.log({ url, delay })
  server(runner, delay, clear_files)
} else {
  let test = async () => {
    console.log("Single Test Running")
    console.log({url})
    const exit_code = (await runner(true)).error ? 0 : 1
    process.exit(exit_code)
  }
  test()
}