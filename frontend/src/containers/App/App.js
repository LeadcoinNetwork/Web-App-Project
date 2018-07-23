import React from "react"
import { app, user, route } from "../../actions"
import * as _ from "lodash"

import Header from "../Header"
import SideMenu from "../SideMenu"
import Snackbar from "../Snackbar"
import { Switch, Route } from "react-router"
import Home from "../Home"
import Admin from "../Admin"
import MyLeads from "../MyLeads"
import SellLeads from "../SellLeads"
import BuyLeads from "../BuyLeads"
import Payments from "../Payments"
import UploadForm from "containers/UploadForm"
import CSVUpload from "../CSVUpload"
import CSVMapping from "../CSVMapping"
import AddLead from "../AddLead"
import Dispute from "../Dispute"
import Checkout from "../Checkout"
import NotificationTable from "containers/NotificationsTable"
import Signup from "../Signup"
import EmailConfirmation from "containers/EmailConfirmation"
import CompleteRegistration from "containers/CompleteRegistration"
import Login from "../Login"
import ForgotPassword from "../ForgotPassword"
import UserSettings from "../UserSettings"
import Withdraw from "containers/Withdraw"
import Terms from "../Terms"
import Privacy from "../Privacy"
import { connect } from "react-redux"
import { createBrowserHistory } from "history"
import Steps from "../steps"

import ResultsModeContext from "./ResultsModeContext"

class App extends React.Component {
  render() {
    let loggedIn = !!_.get(this.props, "user.id")
    let disabled = !!_.get(this.props, "user.disabled")
    let path = _.get(this.props, "location.pathname", "")

    let resultsModeContextValue = {
      cardsMode: this.props.app.cardsMode,
      toggleMode: this.props.toggleResultsMode,
    }

    return (
      <ResultsModeContext.Provider value={resultsModeContextValue}>
        <Steps />
        <div className="ldc-app">
          <Header />
          {loggedIn && !disabled && <SideMenu path={path} />}
          <main
            className={loggedIn && !disabled ? "a-app-mode" : "a-sign-mode"}
          >
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/email-confirmation" component={EmailConfirmation} />
              <Route
                path="/complete-registration"
                component={CompleteRegistration}
              />
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
              <Route path="/checkout" component={Checkout} />
              <Route path="/dispute" component={Dispute} />
              <Route path="/notifications" component={NotificationTable} />
              <Route path="/terms" component={Terms} />
              <Route path="/privacy" component={Privacy} />
            </Switch>
          </main>
          <Snackbar />
        </div>
      </ResultsModeContext.Provider>
    )
  }
}

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
  location: _.get(state, "router.location"),
  pathname: _.get(state, "router.location.pathname"),

  // We want to rerender the root every time the languag changes. We don't use this props.
  _: state.language.country,
})

// export default App
export default connect(mapStateToProps, {
  toggleResultsMode: app.toggleResultsMode,
})(App)
