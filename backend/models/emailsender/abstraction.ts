export default interface EmailSender {
  send({ from, to, subject, html }): Promise<any>
}


export interface EmailSenderClass {
  // new (send({ from, to, subject, html }): Promise<any>) :EmailSender
  new ({frontend,backend}:{frontend:string,backend:string}) :EmailSender
}

export interface EmailProperties {
  from?: string
  to: string
  subject: string
  html: string
}


class moshe {
  constructor({frontend,backend}:{frontend:string,backend:string}){
    super()
  }
  send({ from, to, subject, html }): Promise<any>{
  }

}

function hello(d:EmailSenderClass){
  var y=new d()
  y.
}

hello(moshe)