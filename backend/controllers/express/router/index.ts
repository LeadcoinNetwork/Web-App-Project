import * as _404 from "./404"
import * as errorhandler from "./errorhandler"
import * as userRouter from "./user"
import * as auth from "./auth"
import * as leads from "./leads"
import * as csv from "./csv"
import * as cors from "./cors"
import * as bodyParser from "body-parser"

//@ts-ignore cookie-parser is missing (not really)
import * as cookieParser from "cookie-parser"
import AppPassports from "../passport/index"

import EmailSender from "../../../models/emailsender/abstraction"
import UserActions from "../../../models/user-actions/user-actions"
import EmailCreator from "../../../models/email-creator/email-creator"
import EmailSenderError from "../../../models/emailsender/error"

export function start({
  app,
  frontend,
  userActions,
  emailSender,
  emailCreator,
}: {
  app
  frontend
  userActions: UserActions
  emailSender?: EmailSender
  emailCreator?: EmailCreator
}) {
  if (!emailSender) {
    // In cases emailSender not exists, throw an error error if we try to do ".send"
    emailSender = new EmailSenderError()
  }
  if (!emailCreator) {
    emailCreator = new EmailCreator({ backend: "", from: "" })
  }

  app.use(bodyParser.json())
  app.use(cookieParser())
  cors.start(app, frontend)

  AppPassports.start({ userActions, app, emailSender, emailCreator })
  auth.start({
    app,
    frontend,
    emailSender,
    emailCreator,
    userActions,
  })

  userRouter.start({
    app,
    emailSender,
    emailCreator,
    userActions,
  })

  // leads
  // csv
  _404.start(app)
  errorhandler.start(app)
}
