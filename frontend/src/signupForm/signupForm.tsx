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

  handleChange = (name:string) => {
    return (event:any) => {
      this.setState({
        [name]: event.target.value,
      });
    };
  } 

  passwordField() {
    const {password, cpassword} = this.state
    let errorText = ''
    if (password!=cpassword) {
      errorText = 'Passwords do not match'
      console.log(1)
    }
    return (
      <div>
        <TextField
          id="password"
          label="Password"
          className="pwordField"
          value={this.state.password}
          onChange={this.handleChange('password')}
          errorText = {errorText}
          type="password"
          margin="normal" 
          />
          <br/>
        <TextField
          id="confirm_password"
          label="Confirm Password"
          errorText = {errorText}
          className="cpwordField"
          value={this.state.cpassword}
          onChange={this.handleChange('cpassword')}
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
              onChange={this.handleChange('fname')}
              margin="normal" />
          </div>
          <div>
            <TextField
              id="lname"
              label="Last Name"
              className="lnameField"
              value={this.state.lname}
              onChange={this.handleChange('lname')}
              margin="normal" />
          </div>
          <div>
            <TextField
              id="email"
              label="Email"
              className="emailField"
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal" />
          </div>
          {this.passwordField()}
          <Button variant="raised" color="primary">
            SignUp
          </Button>
        </div>
      </div>
    );
  }
}
