import * as React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

interface stateProps {
  email: string
  password: string
  cpassword: string
  fname: string
  lname: string
}

export class SignupForm extends React.Component {
  state: stateProps = {
    email: '',
    password: '',
    cpassword: '',
    fname: '',
    lname: ''
  }

  lnameChange(event: any) {
    this.setState({
      lname: event.target.value
    })
  }

  fnameChange(event: any) {
    this.setState({
      fname: event.target.value
    })
  }

  cpwordChange(event: any) {
    this.setState({
      cpassword: event.target.value
    })
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

  passwordField() {
    const {password, cpassword} = this.state
    let errorText = ''
    if (password!=cpassword) {
      errorText = 'Passwords do not match'
    }
    return (
      <div>
        <TextField
          id="password"
          label="Password"
          className="pwordField"
          value={this.state.password}
          onChange={this.pwordChange.bind(this)}
          errorText = {errorText}
          type="password"
          margin="normal" 
          />
        <TextField
          id="confirm_password"
          label="Confirm Password"
          errorText = {errorText}
          className="cpwordField"
          value={this.state.cpassword}
          onChange={this.cpwordChange.bind(this)}
          type="password"
          margin="normal" 
          />
      </div>
    )
  }

  render() {
    return (
      <div className="signupForm">
        <div className="signupDetails">
          <div>
            <TextField
              id="fname"
              label="First Name"
              className="fnameField"
              value={this.state.fname}
              onChange={this.fnameChange.bind(this)}
              margin="normal" />
          </div>
          <div>
            <TextField
              id="lname"
              label="Last Name"
              className="lnameField"
              value={this.state.lname}
              onChange={this.lnameChange.bind(this)}
              margin="normal" />
          </div>
          <div>
            <TextField
              id="email"
              label="Email"
              className="emailField"
              value={this.state.email}
              onChange={this.emailChange.bind(this)}
              margin="normal" />
          </div>
          <Button variant="raised" color="primary">
            SignUp
          </Button>
        </div>
      </div>
    );
  }
}
