import * as strategies from "./passport-strategies"
import * as passport from "passport"

import UserActions from "../../../models/user-actions/user-actions"
import EmailCreator from "../../../models/email-creator/email-creator"
import EmailSender from "../../../models/emailsender-abstraction/emailsender-abstraction"

function start({
  app,
  userActions,
  emailCreator: EmailCreator,
  emailSender: EmailSender,
}: {
  app: any
  userActions: UserActions
  emailCreator: EmailCreator
  emailSender: EmailSender
}) {
  app.use(passport.initialize())

  var s = strategies.getStrategies({ userActions })

  passport.use(s.localStrategy)
  passport.use(s.jwtStrategy)
  passport.use(s.googleStrategy)
  passport.use(s.linkedInStrategy)
}

export default { start }
