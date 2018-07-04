import React from "react"
import { Switch, Route } from "react-router"
import App from "Containers/App"
import Home from "Containers/Home"
import Admin from "Containers/Admin"
import MyLeads from "Containers/MyLeads"
import SellLeads from "Containers/SellLeads"
import BuyLeads from "Containers/BuyLeads"
import Payments from "Containers/Payments"
import UploadForm from "containers/UploadForm"
import CSVUpload from "Containers/CSVUpload"
import CSVMapping from "Containers/CSVMapping"
import AddLead from "Containers/AddLead"
import Dispute from "Containers/Dispute"
import Checkout from "Containers/Checkout"
import NotificationTable from "containers/NotificationsTable"
import Signup from "Containers/Signup"
import EmailConfirmation from "containers/EmailConfirmation"
import CompleteRegistration from "containers/CompleteRegistration"
import Login from "Containers/Login"
import ForgotPassword from "Containers/ForgotPassword"
import UserSettings from "Containers/UserSettings"
import Withdraw from "containers/Withdraw"
import Terms from "Containers/Terms"
import Privacy from "Containers/Privacy"
import { connect } from "react-redux"

const Root = props => (
  <App>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/email-confirmation" component={EmailConfirmation} />
      <Route path="/complete-registration" component={CompleteRegistration} />
      <Route path="/user-settings" component={UserSettings} />
      <Route path="/login" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/admin" component={Admin} />
      <Route path="/buy-leads" component={BuyLeads} />
      <Route path="/sell-leads" component={SellLeads} />
      <Route path="/my-leads" component={MyLeads} />
      <Route path="/payments" component={Payments} />
      <Route path="/withdraw" component={Withdraw} />
      {/* <Route path="/uploadform" component={UploadForm} /> */}
      <Route path="/csv-upload" component={CSVUpload} />
      <Route path="/csv-mapping" component={CSVMapping} />
      <Route path="/add-lead" component={AddLead} />
      <Route path="/checkout/" component={Checkout} />
      <Route path="/dispute" component={Dispute} />
      <Route path="/notifications" component={NotificationTable} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
    </Switch>
  </App>
)

// We want to rerender the root every time the language
// changes.
// We don't use this props.
const ConnectedRoot = connect(state => ({
  _: state.translate.current,
}))(Root)
export default ConnectedRoot
