import React from "react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import Header from "Components/Header"
import { connect } from "react-redux"
import { notifications } from "../../actions/index"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"

class App extends React.Component {
  constructor(props) {
    super(props)

    this.boundPush = bindActionCreators(push, props.dispatch)

    notifications.connectToNotifications(props.dispatch)
  }
  render() {
    let { notifications } = this.props

    return (
      <MuiThemeProvider>
        <div className="ldc-app">
          <Header notifications={notifications} />
          <main>{this.props.children}</main>
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications,
})

export default connect(mapStateToProps)(App)
