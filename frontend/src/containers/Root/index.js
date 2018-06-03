import React from "react";
import { Switch, Route } from "react-router";
import App from "Containers/App";
import TableData from "Containers/TableData";
import LoginForm from "Components/LoginForm";
import SignupForm from "Components/signupForm";
import CSVUpload from "Components/CSVUpload";
import EmailConfirmation from "Components/EmailConfirmation";
import UserDetails from "Components/UserDetails";

const Root = () => (
  <App>
    <Switch>
      <Route path="/user-details" component={UserDetails} />
      <Route path="/email-confirmation" component={EmailConfirmation} />
      <Route path="/signup" component={SignupForm} />
      <Route path="/login" component={LoginForm} />
      <Route path="/csv-upload" component={CSVUpload} />
      <Route path="/leads" component={TableData} />
    </Switch>
  </App>
);

export default Root;
