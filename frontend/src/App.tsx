import * as React from 'react'
import './App.css'
import { LoginForm } from './loginForm/LoginForm'
import { SignupForm } from './signupForm/signupForm'
import { UserDetails } from './userDetails/userDetails'
import { EmailConfirm } from './emailConfirm/emailconfirm'
import { CsvUpload } from './csvUpload/csvUpload'
import Button from './leadcoin_ui/Button'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Table from './Table';

interface stateProps {
  currentPage: string
  token: string
  user?: any
}

class App extends React.Component {
  state: stateProps = {
    currentPage: 'login',
    token: ''
  }

  navigate = (route: string) => {
    this.setState({
      currentPage: route
    })
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
        <div className="logo"> </div>
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
      this.setState({currentPage: 'emailVerification'})
    }

    return (
      <MuiThemeProvider>
        <div className="App">
          <Table />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
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
