import React from "react"
import { app, user, route } from "../../actions"
import * as _ from "lodash"

import Header from "../header"
import SideMenu from "../sideMenu"
import Snackbar from "../snackbar"
import { Switch, Route } from "react-router"
import Home from "../home"
import Admin from "../admin"
import MyLeads from "../myLeads"
import SellLeads from "../sellLeads"
import BuyLeads from "../buyLeads"
import Payments from "../payments"
import UploadForm from "../uploadForm"
import csvUpload from "../csvUpload"
import csvMapping from "../csvMapping"
import AddLead from "../addLead"
import Dispute from "../dispute"
import Checkout from "../checkout"
import NotificationTable from "../notificationsTable"
import Signup from "../signup"
import EmailConfirmation from "../emailConfirmation"
import CompleteRegistration from "../completeRegistration"
import Login from "../login"
import ForgotPassword from "../forgotPassword"
import UserSettings from "../userSettings"
import Withdraw from "../withdraw"
import Terms from "../terms"
import Privacy from "../privacy"
import { connect } from "react-redux"
import { createBrowserHistory } from "history"
import Steps from "../steps"

import ResultsModeContext from "./resultsModeContext"

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
              <Route path="/csv-upload" component={csvUpload} />
              <Route path="/csv-mapping" component={csvMapping} />
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
