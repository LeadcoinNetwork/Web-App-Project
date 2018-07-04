// external modules
import EmailSenderAbstraction from "./abstraction"
const mailer = require("nodemailer-promise")
import LogModelActions from "../log-model-actions/log-model-actions"
class EmailSenderNodeMailer implements EmailSenderAbstraction {
  log = LogModelActions("nodemailer")
  mailer
  host
  port
  user
  pass

  constructor({ host, port, user, pass }) {
    Object.assign(this, { host, port, user, pass })
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

  async send({
    from,
    to,
    subject,
    html,
  }: {
    from: string
    to: string
    subject: string
    html: string
  }) {
    this.log("Send Start", arguments[0])
    var res = await this.mailer({
      from,
      to,
      subject,
      html,
    })
    this.log("Send End", res)
    return res
  }
}

export default EmailSenderNodeMailer
