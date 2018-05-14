import * as React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import axios from 'axios'

interface stateProps {
  email: string
  password: string
  needEmailVerification: boolean
}

interface ComponentProps {
  navigate: any
  saveToken: any
  setUser: any
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
      const {user, token} = response.data
      const {phone, country, company} = user
      this.props.setUser(user)
      this.props.saveToken(token)
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
    return (
      <div className="loginForm">
        <div className="login_containers">
          <div className="login_header"> Login.</div>
          <div className="external_login_container">
            <div> <Button variant="raised" onClick={this.loginfb.bind(this)} color="primary"> Facebook </Button> </div>
            <div> <Button variant="raised" color="primary"> Google </Button> </div>
          </div>
          <div className="localLogin">
            <div> Or enter your details. </div>
            <div>
              <TextField
                id="email"
                label="Email"
                fullWidth={true}
                className="emailField"
                value={this.state.email}
                onChange={this.emailChange.bind(this)}
                margin="normal" />
            </div>
            <div>
              <TextField
                id="password"
                label="Password"
                fullWidth={true}
                className="pwordField"
                value={this.state.password}
                onChange={this.pwordChange.bind(this)}
                type="password"
                margin="normal" />
            </div>
            <div className="flexed login_helpers"> 
              <div className="remember_me">
                <input type="checkbox" />
                <span> Remember me? </span>
              </div>
              <div className=""> Forgot your password? </div>
            </div>
            <div className="alignRight">
              <Button variant="raised" onClick={this.login.bind(this)} color="primary">
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
