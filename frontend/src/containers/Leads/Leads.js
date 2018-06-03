import React from "react";
import { Switch, Route } from "react-router";
import Buy from "./Buy";
import Sell from "./Sell";
import My from "./My";

const Leads = () => (
  <Switch>
    <Route path="/leads/buy" component={Buy} />
    <Route path="/leads/sell" component={Sell} />
    <Route path="/leads/my" component={My} />
  </Switch>
);

export default Leads;
