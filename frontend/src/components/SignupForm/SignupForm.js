import React from "react";
import axios from "axios";
import Button from "Components/Button";
import TextField from "Components/TextField";
import SSOContainer from "Components/SSOContainer";

class SignupForm extends React.Component {
  state = {
    email: "",
    password: "",
    fname: "",
    lname: "",
    errors: []
  };

  handleChange = name => {
    return event => {
      this.setState({ [name]: event.target.value });
    };
  };

  submit = () => {
    const { fname, lname, password, email } = this.state;
    axios
      .post(`${process.env.BACKEND}/user`, {
        fname,
        lname,
        email,
        password
      })
      .then(({ data }) => {
        const { token, user } = data;
        this.props.setUser(user);
        this.props.saveToken(token);
      })
      .catch(error => {
        if (error.response) {
          // error originated from server
          if (error.response.data.error) {
            let errors = error.response.data.error.split("; ");
            this.setState({ errors: errors });
          }
        } else if (error.request) {
          // request made, no response though
        } else {
          // error was thrown during request setup
        }
      });
  };

  passwordField() {
    return (
      <div>
        <TextField
          label="Password"
          value={this.state.password}
          onChange={this.handleChange("password")}
          type="password"
        />
        <br />
      </div>
    );
  }

  generalError() {
    const { errors } = this.state;
    if (errors.length > 0) {
      const errorMsgs = errors.map((e, i) => {
        return <div key={i}>{e}</div>;
      });
      return <div className="error">{errorMsgs}</div>;
    }
    return;
  }

  render() {
    return (
      <div className="signupForm">
        <SSOContainer />
        <div className="signupDetails">
          <div>
            <TextField
              label="First Name"
              value={this.state.fname}
              onChange={this.handleChange("fname")}
            />
          </div>
          <div>
            <TextField
              label="Last Name"
              value={this.state.lname}
              onChange={this.handleChange("lname")}
            />
          </div>
          <div>
            <TextField
              label="Email"
              value={this.state.email}
              onChange={this.handleChange("email")}
            />
          </div>
          {this.passwordField()}
          {this.generalError()}
          <Button onClick={this.submit}>SignUp</Button>
        </div>
      </div>
    );
  }
}

export default SignupForm;
