import React from "react"
import { Switch, Route } from "react-router"
import EmailConfirmation from "../EmailConfirmation"
import CompleteRegistration from "../CompleteRegistration"

const Users = () => (
  <Switch>
    <Route path="/users/email-confirmation" component={EmailConfirmation} />
    <Route
      path="/users/complete-registration"
      component={CompleteRegistration}
    />
  </Switch>
)

export default Users
