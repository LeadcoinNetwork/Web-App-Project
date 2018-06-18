class Mailer {
  constructor() {}
  send() {
    console.log("Send Email:", JSON.stringify(arguments))
    return Promise.resolve()
  }
}
module.exports = Mailer
