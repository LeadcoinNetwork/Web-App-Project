import * as React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import axios from 'axios'

interface stateProps {
  email: string
  password: string
}

interface ComponentProps {
  navigate: any
}

export class LoginForm extends React.Component <ComponentProps> {
  state: stateProps = {
    email: '',
    password: ''
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

  loginfb() {
    axios.get('/auth/facebook')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    return (
      <div className="loginForm">
        <div className="localLogin">
          <div>
            <TextField
              id="email"
              floatingLabelText="Email"
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
          <Button variant="raised" color="primary">
            Login
          </Button>
        </div>
        <div> Or, you can sign in using </div>
        <div className="external_login_container">
          <div> <Button variant="raised" onclick={this.loginfb.bind(this)} color="primary"> Facebook </Button> </div>
          <div> <Button variant="raised" color="primary"> Google </Button> </div>
        </div>
        <div className="signup_cta">
          <span> Not a user? </span>
          <span onClick={this.navigate.bind(this)}> Sign-up now! </span>
          </div>
      </div>
    );
  }
}
