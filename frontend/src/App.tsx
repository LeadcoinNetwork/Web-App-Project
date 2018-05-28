import * as React from 'react'
import './App.css'
import { LoginForm } from './loginForm/LoginForm'
import { SignupForm } from './signupForm/signupForm'
import { UserDetails } from './userDetails/userDetails'
import { EmailConfirm } from './emailConfirm/emailconfirm'
import { CsvUpload } from './csvUpload/csvUpload'
import Button from './leadcoin_ui/Button'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
const Cookies = require('js-cookie')

interface stateProps {
  currentPage: string
  token: string
  user?: any
}

let currentPage = 'login'
let token = Cookies.get('token') || ''
let user = Cookies.get('user') || {}

try {
  user = JSON.parse(user)
  if (user.disabled) {
    currentPage = 'emailVerification'
  }
  if (user.phone)
    currentPage='dashboard'
  else
    currentPage='userDetails'
} catch (e) {
  user = ''
}

class App extends React.Component {
  state: stateProps = {
    currentPage, token, user
  }

  navigate = (currentPage: string) => {
    this.setState({ currentPage })
  }

  saveToken = (token: string) => {
    this.setState({ token })
  }

  setUser = (user: object) => {
    this.setState({ user })
  }

  getComponent() {
    const {currentPage} = this.state
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
          setUser = {this.setUser}
          saveToken={this.saveToken}
          navigate={this.navigate}
        />
    }
    return
  }

  render() {
    const top_strip = (
      <div className="flexed flexed_start top_strip">
        <div onClick={ () => this.navigate('login')} className="logo"> </div>
        <div> Don't have an account? </div>
        <div>
          <Button onClick={() => {this.navigate("signup")}}>
            Start Now
          </Button>
        </div>
        <div>
          <Button onClick={() => {this.navigate("uploadCsv")}}>
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
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
