import EmailSenderAbstraction, { EmailProperties } from "./abstraction"

class EmailSenderMock implements EmailSenderAbstraction {
  private _lastCall: EmailProperties
  send(props: EmailProperties) {
    this._lastCall = props
    return Promise.resolve()
  }
  clear = () => {
    delete this._lastCall
  }
  lastCall = () => {
    if (!this._lastCall) {
      throw new Error("never called")
    }
    return this._lastCall
  }
}
export default EmailSenderMock
