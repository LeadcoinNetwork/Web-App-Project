// external modules
const mailer = require("nodemailer-promise")

class NodeMailer {
  constructor({ host, port, user, pass }) {
    this.host = host
    this.port = port
    this.user = user
    this.pass = pass
    this.mailer = mailer.config({
      host,
      port,
      auth: { user, pass },
    })
  }

  send(arg0) {
    this.mailer(arg0)
  }
}

module.exports = NodeMailer
