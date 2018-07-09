import React from "react"
import { user, route } from "Actions"
import * as _ from "lodash"

import Header from "Containers/Header"
import SideMenu from "Containers/SideMenu"
import Snackbar from "Containers/Snackbar"
import { Switch, Route } from "react-router"
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
import { createBrowserHistory } from "history"

import ResultsModeContext from "./ResultsModeContext"

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cardsMode: true,
    }
  }
  toggleResultsMode = () => {
    this.setState(state => ({
      cardsMode: !state.cardsMode,
    }))
  }
  render() {
    let loggedIn = !!_.get(this.props, "user.id")
    let disabled = !!_.get(this.props, "user.disabled")
    let path = _.get(this.props, "location.pathname", "")
    let resultsModeContextValue = {
      cardsMode: this.state.cardsMode,
      toggleMode: this.toggleResultsMode,
    }

    return (
      <ResultsModeContext.Provider value={resultsModeContextValue}>
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
              <Route path="/checkout/" component={Checkout} />
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
  user: state.user,
  location: _.get(state, "router.location"),
  pathname: _.get(state, "router.location.pathname"),

  // We want to rerender the root every time the languag changes. We don't use this props.
  _: state.translate.current,
})

// export default App
import { hot } from "react-hot-loader"
export default hot(module)(connect(mapStateToProps)(App))
