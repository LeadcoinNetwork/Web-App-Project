import * as React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import axios from 'axios'
import {EmailConfirm} from '../emailConfirm/emailconfirm'

interface stateProps {
  email: string
  password: string
  needEmailVerification: boolean
}

interface ComponentProps {
  navigate: any
}

export class LoginForm extends React.Component <ComponentProps> {
  state: stateProps = {
    email: '',
    password: '',
    needEmailVerification: false
  }

  pwordChange(event: any) {
    this.setState({
      password: event.target.value
    })
  }

  emailChange(event: any) {
    this.setState({
      email: event.target.value
    })
  }

  navigate() {
    this.props.navigate('signup')
  }

  login() {
    const {password, email} = this.state
    axios.post('http://localhost:3000/api/v1/auth/login', {
      email, password
    })
    .then((response) => {
      const {user} = response.data
      const {phone, country, company} = user
      if (phone && country && company) {
        // TODO: continue to site and stuff
      } else {
        this.props.navigate('userDetails')
      }
    })
    .catch((e) => {
      if (e.response) {
        // error originated from server
        if (e.response.data.error){
          const {error} = e.response.data
          switch (error) {
            case "Unauthorized": 
              this.setState({error})
              break
            case "EMAIL_NOT_VERIFIED": 
              this.setState({
                needEmailVerification: true
              })
              break
          }
        }
      } else if (e.request) {
        // request made, no response though
      } else {
        // error was thrown during request setup
      }
    });
  }

  loginfb() {
    axios.get('http://localhost:3000/api/v1/auth/facebook')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    });
  }

  render() {
    const {needEmailVerification} = this.state
    if (needEmailVerification) {
      return (
        <EmailConfirm />
      )
    }
    return (
      <div className="loginForm">
        <div className="localLogin">
          <div>
            <TextField
              id="email"
              label="Email"
              className="emailField"
              value={this.state.email}
              onChange={this.emailChange.bind(this)}
              margin="normal" />
          </div>
          <div>
            <TextField
              id="password"
              label="Password"
              className="pwordField"
              value={this.state.password}
              onChange={this.pwordChange.bind(this)}
              type="password"
              margin="normal" />
          </div>
          <Button variant="raised" onClick={this.login.bind(this)} color="primary">
            Login
          </Button>
        </div>
        <div> Or, you can sign in using </div>
        <div className="external_login_container">
          <div> <Button variant="raised" onClick={this.loginfb.bind(this)} color="primary"> Facebook </Button> </div>
          <div> <Button variant="raised" color="primary"> Google </Button> </div>
        </div>
        <div className="signup_cta">
          <span> Not a user? </span>
          <a onClick={this.navigate.bind(this)}> Sign-up now! </a>
          </div>
      </div>
    );
  }
}
