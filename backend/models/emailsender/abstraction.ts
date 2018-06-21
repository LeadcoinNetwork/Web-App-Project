export default interface EmailSender {
  send({ from, to, subject, html }): Promise<any>
}

export interface EmailProperties {
  from?: string
  to: string
  subject: string
  html: string
}
