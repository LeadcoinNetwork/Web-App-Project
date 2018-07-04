import * as strategies from "./passport-strategies"
import * as passport from "passport"

import EmailCreator from "../../models/email-creator/email-creator"
import EmailSender from "../../models/emailsender/abstraction"
import AppLogic from "../../app-logic/index"

function start({ expressApp, appLogic }: { expressApp; appLogic: AppLogic }) {
  expressApp.use(passport.initialize())
  var s = strategies.getStrategies({ appLogic })

  passport.use(s.jwtStrategy)
  passport.use(s.googleStrategy)
  passport.use(s.linkedInStrategy)
}

export default { start }
