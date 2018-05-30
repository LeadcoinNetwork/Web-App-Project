import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginForm from 'Components/LoginForm';
import SignupForm from 'Components/signupForm';
import UserDetails from 'Components/userDetails';
import EmailConfirm from 'Components/emailconfirm';
import CsvUpload from 'Components/csvUpload';
import Button from 'Components/Button';
import TableData from 'Containers/TableData';

const cookies = require('js-cookie');

let currentPage = 'login';
let token = cookies.get('token') || '';
let user = cookies.get('user') || {};

try {
  user = JSON.parse(user)
  if (user.disabled) {
    currentPage = 'emailVerification'
  }
  if (user.phone)
    currentPage = 'dashboard'
  else
    currentPage = 'userDetails'
} catch (e) {
  user = ''
}

class App extends React.Component {
  state = {
    currentPage, token, user
  }

  navigate = currentPage => {
    this.setState({ currentPage })
  }

  saveToken = token => {
    this.setState({ token })
  }

  setUser = user => {
    this.setState({ user })
  }

  getComponent() {
    const { currentPage } = this.state
    switch (currentPage) {
      case "uploadCsv":
        return <CsvUpload
          navigate={this.navigate}
          token={this.state.token}
        />
      case "dashboard":
        return <div> You are logged in </div>
      case "emailVerification":
        return <EmailConfirm
          navigate={this.navigate}
          token={this.state.token}
        />
      case "userDetails":
        return <UserDetails
          token={this.state.token}
          user={this.state.user}
        />
      case "login":
        return <LoginForm
          setUser={this.setUser}
          saveToken={this.saveToken}
          navigate={this.navigate}
        />
      case "signup":
        return <SignupForm
          setUser={this.setUser}
          saveToken={this.saveToken}
          navigate={this.navigate}
        />
    }
    return
  }

  render() {
    const top_strip = (
      <div className="flexed flexed_start top_strip">
        <div onClick={() => this.navigate('login')} className="logo"> </div>
        <div> Don't have an account? </div>
        <div>
          <Button onClick={() => { this.navigate("signup") }}>
            Start Now
          </Button>
        </div>
        <div>
          <Button onClick={() => { this.navigate("uploadCsv") }}>
            Upload
          </Button>
        </div>
      </div>
    )

    if (this.state.user && this.state.user.disabled && this.state.currentPage != 'emailVerification') {
      //this.setState({currentPage: 'emailVerification'})
    }

    return (
      <MuiThemeProvider>
        <div className="App">
          {top_strip}
          <div className="page_split">
            <div className="left">
              {this.getComponent()}
            </div>
            <div className="right">
              <div> Marketing Text </div>
              <div> Video </div>
            </div>
          </div>
          <TableData />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
