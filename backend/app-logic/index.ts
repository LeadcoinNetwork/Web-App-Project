import UploadCSV from "./upload-csv"
import UploadForm from "./upload-form"
import UploadLeads from "./upload-leads"
import UserLogin from "./user-login"
import UserLogout from "./user-logout"
import UserRegister from "./user-register"

import { appModels } from "./types"
import * as config from "./config"

import EmailCreator from "../models/email-creator/email-creator"
import EmailSenderAbstraction from "../models/emailsender/abstraction"
import EmailSenderNodeMailer from "../models/emailsender/nodemailer"
import EmailSenderConsole from "../models/emailsender/console"
import Users from "../models/users/users"
import RestServer from "../rest/index"

export default class AppLogic {
  public emailCreator: EmailCreator
  public emailSender: EmailSenderAbstraction
  public readonly config = config

  public users = new Users()

  // private uploadCSV= new UploadCSV()
  private uploadForm = new UploadForm()
  private uploadLeads = new UploadLeads()
  private userLogout = new UserLogout()
  public userRegister = new UserRegister({
    emailCreator: this.emailCreator,
    emailSender: this.emailSender,
    appLogic: this,
  })
  public userLogin = new UserLogin(this)

  constructor(props?: {
    emailSender?: EmailSenderAbstraction
    emailCreator?: EmailCreator
  }) {
    if (!props) props = {}

    if (props.emailSender) {
      this.emailSender = props.emailSender
    } else {
      this.emailSender =
        config.mail.mailer == "CONSOLE"
          ? new EmailSenderConsole()
          : new EmailSenderConsole()
    }

    if (props.emailCreator) {
      this.emailCreator = props.emailCreator
    } else {
      this.emailCreator = new EmailCreator({ backend: "", from: "" })
    }
  }

  createServer = () => {
    var restServer = new RestServer({
      appLogic: this,
      env: "",
      frontend: "",
    })
    var httpServer = restServer.createHttpServer()
    return httpServer
  }

  createServerAndListen() {
    var httpServer = this.createServer()
    httpServer.listen(config.app.port, () => {
      console.log("listening on *:" + config.app.port)
    })
    return httpServer
  }
}
