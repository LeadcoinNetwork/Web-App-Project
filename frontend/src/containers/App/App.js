import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "Components/Header";
import UserDetails from "Components/userDetails";
import { connect } from "react-redux";

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
  render() {
    return (
      <MuiThemeProvider>
        <div className="ldc-app">
          <Header dispatch={this.props.dispatch} />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect()(App);
