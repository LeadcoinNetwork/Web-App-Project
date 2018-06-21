import EmailSenderAbstraction from "./abstraction"

class EmailSenderConsole implements EmailSenderAbstraction {
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
    console.log("Send Email:", JSON.stringify(arguments[0]))
    return Promise.resolve()
  }
}
export default EmailSenderConsole
