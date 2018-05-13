import * as React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import axios from 'axios'

interface stateProps {
  email: string
  password: string
  cpassword: string
  fname: string
  lname: string
  errors: string[]
}

export class SignupForm extends React.Component {
  state: stateProps = {
    email: '',
    password: '',
    cpassword: '',
    fname: '',
    lname: '',
    errors: []
  }

  handleChange = (name:string) => {
    return (event:any) => {
      this.setState({ [name]: event.target.value });
    };
  } 

  submit = () => {
    const {fname, lname, password, email} = this.state
    axios.post('http://localhost:3000/api/v1/user', {
      fname, lname, email, password
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      if (error.response) {
        // error originated from server
        if (error.response.data.error){
          let errors = error.response.data.error.split("; ")
          this.setState({errors: errors})
        }
      } else if (error.request) {
        // request made, no response though
      } else {
        // error was thrown during request setup
      }
    });
  }

  passwordField() {
    const {password, cpassword} = this.state
    let errorText
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

  generalError() {
    const {errors} = this.state
    const errorMsgs = errors.map((e,i) => {return (<div key={i}>{e}</div>)})
    if (errorMsgs.length < 1)
      return
    return (
      <div className='error'>
        {errorMsgs}
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
          {this.generalError()}
          <Button variant="raised" color="primary" onClick={this.submit.bind(this)}>
            SignUp
          </Button>
        </div>
      </div>
    );
  }
}
