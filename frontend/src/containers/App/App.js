import React from "react"
import { connect } from "react-redux"
import { notifications, user, route } from "Actions"
import Header from "Containers/Header"
import SideMenu from "Containers/SideMenu"
import Snackbar from "Containers/Snackbar"

class App extends React.Component {
  constructor(props) {
    super(props)

    notifications.connectToNotifications(props.dispatch)
  }
  render() {
    let loggedIn = !!this.props.user.id,
      disabled = !!this.props.user.disabled,
      path = this.props.location.pathname

    return (
      <div className="ldc-app">
        <Header
          loggedIn={loggedIn}
          disabled={disabled}
          path={path}
          gotoDefaultHome={this.props.gotoDefaultHome}
          logout={this.props.logout}
        />
        {loggedIn && !disabled && <SideMenu path={path} />}
        <main className={loggedIn && !disabled ? "a-app-mode" : ""}>
          {this.props.children}
        </main>
        <Snackbar />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  location: state.routerReducer.location,
})

export default connect(
  mapStateToProps,
  {
    logout: user.loggedOut,
    gotoDefaultHome: route.gotoDefaultHome,
  },
)(App)
