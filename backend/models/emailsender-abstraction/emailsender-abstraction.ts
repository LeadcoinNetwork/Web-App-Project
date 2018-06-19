export default interface EmailSender {
  send({ from, to, subject, html }): Promise<any>
}
