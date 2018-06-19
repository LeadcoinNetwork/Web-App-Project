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
    let loggedIn = !!this.props.user.id

    return (
      <div className="ldc-app">
        <Header loggedIn={loggedIn} />
        <main className={loggedIn ? "a-app-mode" : ""}>
          {this.props.children}
        </main>
        <Snackbar />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(App)
