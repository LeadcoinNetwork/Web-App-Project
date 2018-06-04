import React from "react";
import { Switch, Route } from "react-router";
import Signup from "./Signup";
import EmailConfirmation from "./EmailConfirmation";
import CompleteRegistration from "./CompleteRegistration";
import Login from "./Login";

const Users = () => (
  <Switch>
    <Route path="/users/signup" component={Signup} />
    <Route path="/users/email-confirmation" component={EmailConfirmation} />
    <Route
      path="/users/complete-registration"
      component={CompleteRegistration}
    />
    <Route path="/users/login" component={Login} />
  </Switch>
);

export default Users;
