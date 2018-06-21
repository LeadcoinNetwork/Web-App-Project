import EmailSenderAbstraction, { EmailProperties } from "./abstraction"

class EmailSenderMock implements EmailSenderAbstraction {
  async send(props: EmailProperties) {
    throw new Error("cannot send email from EmailSenderError object")
  }
}
export default EmailSenderMock
