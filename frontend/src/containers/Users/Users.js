import React from "react"
import { Switch, Route } from "react-router"
import Signup from "../Signup/Signup"
import EmailConfirmation from "./EmailConfirmation"
import CompleteRegistration from "./CompleteRegistration"
import Login from "../Login/Login"
import Settings from "./Settings"
import Notifications from "./Notifications"
import Withdrawal from "./Withdrawal"

const Users = () => (
  <Switch>
    <Route path="/users/signup" component={Signup} />
    <Route path="/users/email-confirmation" component={EmailConfirmation} />
    <Route
      path="/users/complete-registration"
      component={CompleteRegistration}
    />
    <Route path="/users/login" component={Login} />
    <Route path="/users/settings" component={Settings} />
    <Route path="/users/notifications" component={Notifications} />
    <Route path="/users/withdrawal" component={Withdrawal} />
  </Switch>
)

export default Users
