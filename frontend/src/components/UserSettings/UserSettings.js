import React, { Component } from "react"
import TextField from "../TextField";
import Button from "../Button";

class UserSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: {
        current: '',
        currentError: '',
        new: '',
        newError: '',
        varify: '',
        varifyError: '',
        succsess: ''
      }
    };
  }
  updateText = e => {
    let password = this.state.password;
    password[e.target.name] = e.target.value;
    this.setState({password});
  }
  changePassword = () => {
    console.log('To Do: send password change to server');
  }
  render() {
    return (
      <div>
        <h1 className="title">User Settings</h1>
        <h3 className="password-title">Change Your Password</h3>
        <div>
          <TextField
            name="current"
            label="Current Password"
            value={this.state.password.current}
            hintText={"Enter Your Current Password"}
            onChange={this.updateText}
            type="password"
          />
        </div>
        {this.state.password.currentError && <div className="current-error">{this.state.password.currentError}</div>}
        <div>
          <TextField
            name="new"
            label="New Password"
            value={this.state.password.new}
            hintText={"Enter Your New Password"}
            onChange={this.updateText}
            type="password"
          />
        </div>
        {this.state.password.newError && <div className="new-error">{this.state.password.newError}</div>}
        <div>
          <TextField
            name="varify"
            label="Varify Password"
            value={this.state.password.varify}
            hintText={"Varify Your New Password"}
            onChange={this.updateText}
            type="password"
          />
        </div>
        {this.state.password.varifyError && <div className="varify-error">{this.state.password.varifyError}</div>}
        <div>
          <Button
            label="Submit"
            onClick={this.changePassword}
          />
        </div>
        {this.state.password.succsess && <div className="succsess">{this.state.password.succsess}</div>}
      </div>
    )
  }
}

export default UserSettings
