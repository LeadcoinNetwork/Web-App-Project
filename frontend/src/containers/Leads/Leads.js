import React from "react";
import { Switch, Route } from "react-router";
import Buy from "./Buy";
import Sell from "./Sell";
import My from "./My";
import New from "./New";
import CSVUload from "./CSVUpload";
import CSVMapping from "./CSVMapping";
import Checkout from "./Checkout";
import Dispute from "./Dispute";

const Leads = () => (
  <Switch>
    <Route path="/leads/buy" component={Buy} />
    <Route path="/leads/sell" component={Sell} />
    <Route path="/leads/my" component={My} />
    <Route path="/leads/new" component={New} />
    <Route path="/leads/csv-upload" component={CSVUload} />
    <Route path="/leads/csv-mapping" component={CSVMapping} />
    <Route path="/leads/checkout/" component={Checkout} />
    <Route path="/leads/:id/dispute" component={Dispute} />
  </Switch>
);

export default Leads;
