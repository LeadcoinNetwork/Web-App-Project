import React from "react"
import { connect } from "react-redux"
import { notifications } from "../../actions/index"
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
      path = this.props.location.pathname

    return (
      <div className="ldc-app">
        <Header loggedIn={loggedIn} path={path} />
        {loggedIn && <SideMenu path={path} />}
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
  location: state.routerReducer.location,
})

export default connect(mapStateToProps)(App)
