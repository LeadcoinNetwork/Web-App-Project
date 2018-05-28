import * as React from 'react'
import Button from '../leadcoin_ui/Button'
import TextField from '../leadcoin_ui/TextField'
import axios from 'axios'
import Checkbox from '../leadcoin_ui/Checkbox'
import SSOContainer from '../SSO/SSOContainer'

export class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    remember: true,
    needEmailVerification: false
  }

  pwordChange = event => {
    this.setState({
      password: event.target.value
    })
  }

  emailChange = event => {
    this.setState({
      email: event.target.value
    })
  }

  navigate() {
    this.props.navigate('signup')
  }

  updateCheck = value => {
    this.setState({remember: value})
  }

  login() {
    const {password, email} = this.state
    axios.post('http://127.0.0.1.xip.io:3000/api/v1/auth/login', {
      email, password
    })
    .then((response) => {
      const {user, token} = response.data
      const {phone, country, company} = user
      this.props.setUser(user)
      this.props.saveToken(token)
      if (user.disabled) {
        this.props.navigate('emailVerification')
      } else if (phone && country && company) {
        this.props.navigate('dashboard')
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
              this.props.navigate('emailVerification')
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

  render() {
    return (
      <div className="loginForm">
        <div className="login_containers">
          <div className="login_header"> Login.</div>
          <SSOContainer />
          <div className="localLogin">
            <form className="localLoginForm"
              onSubmit={(e) => {
                this.login()
                e.preventDefault()
                e.stopPropagation()
              }} >
              <div> Or enter your details. </div>
              <div>
                <TextField
                  label="Email"
                  fullWidth={true}
                  value={this.state.email}
                  onChange={this.emailChange}
                  />
              </div>
              <div>
                <TextField
                  label="Password"
                  fullWidth={true}
                  value={this.state.password}
                  onChange={this.pwordChange}
                  type="password"
                  />
              </div>
              <div className="flexed login_helpers">
                <div className="remember_me">
                  <Checkbox
                    label="Simple with controlled value"
                    checked={this.state.remember}
                    onClick={this.updateCheck}
                  />
                  <span> Remember me? </span>
                </div>
                <div className=""> Forgot your password? </div>
              </div>
              <div className="alignRight">
                <Button type="submit">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
