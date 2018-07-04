import EmailSenderAbstraction from "./abstraction"
import LogModelActions from "../log-model-actions/log-model-actions"

class EmailSenderConsole implements EmailSenderAbstraction {
  log = LogModelActions("consolemailer")
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
    this.log("Send To Console", arguments[0])
    console.log("Send Email:", JSON.stringify(arguments[0]))
    return Promise.resolve()
  }
}
export default EmailSenderConsole
