// external modules
import EmailSenderAbstraction from "../emailsender-abstraction/emailsender-abstraction"
const mailer = require("nodemailer-promise")

class EmailSenderNodeMailer implements EmailSenderAbstraction {
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

  send({
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
    return this.mailer({
      from,
      to,
      subject,
      html,
    })
  }
}

export default EmailSenderNodeMailer
