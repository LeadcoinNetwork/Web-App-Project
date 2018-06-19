import * as _404 from "./404"
import * as errorhandler from "./errorhandler"
import * as userRouter from "./user"
import * as auth from "./auth"
import * as leads from "./leads"
import * as csv from "./csv"
import * as cors from "./cors"
import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"
import AppPassports from "../passport/index"

import EmailSender from "../../../models/emailsender-abstraction/emailsender-abstraction"
import UserActions from "../../../models/user-actions/user-actions"
import EmailCreator from "../../../models/email-creator/email-creator"

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
  emailSender: EmailSender
  emailCreator: EmailCreator
}) {
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
