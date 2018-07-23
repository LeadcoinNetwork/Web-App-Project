import React from "react"
import { Switch, Route } from "react-router"
import Login from "./Login"
import Users from "./Users"
import Leads from "./Leads"
import Transactions from "./Transactions"

class Admin extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/admin/login" component={Login} />
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/leads" component={Leads} />
        <Route path="/admin/transactions" component={Transactions} />
      </Switch>
    )
  }
}

export default Admin
