import React from "react"
import Header from "Containers/Header"
import { connect } from "react-redux"
import { notifications } from "../../actions/index"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"
import Snackbar from "Containers/Snackbar"

class App extends React.Component {
  constructor(props) {
    super(props)

    notifications.connectToNotifications(props.dispatch)
  }
  render() {
    return (
      <div className="ldc-app">
        <Header />
        <main>{this.props.children}</main>
        <Snackbar />
      </div>
    )
  }
}

export default connect()(App)
