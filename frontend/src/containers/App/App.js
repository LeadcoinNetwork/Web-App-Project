import React from "react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import Header from "Components/Header"
import UserDetails from "Components/UserDetails"
import { connect } from "react-redux"
import { connectToNotifications } from "../../actions/index"
import { push } from "react-router-redux"
import { bindActionCreators } from "redux"

// const cookies = require('js-cookie');

// let currentPage = 'login';
// let token = cookies.get('token') || '';
// let user = cookies.get('user') || {};

// try {
//   user = JSON.parse(user)
//   if (user.disabled) {
//     currentPage = 'emailVerification'
//   }
//   if (user.phone)
//     currentPage = 'dashboard'
//   else
//     currentPage = 'userDetails'
// } catch (e) {
//   user = ''
// }

class App extends React.Component {
  constructor(props) {
    super(props)

    this.boundPush = bindActionCreators(push, props.dispatch)

    connectToNotifications(props.dispatch)
  }
  render() {
    let { notifications } = this.props

    return (
      <MuiThemeProvider>
        <div className="ldc-app">
          <Header notifications={notifications} />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications,
})

export default connect(mapStateToProps)(App)
