import React from "react"
import { Switch, Route } from "react-router"
import Login from "./login"
import Users from "./users"
import Leads from "./leads"
import Transactions from "./transactions"

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
