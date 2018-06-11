import React from "react"
import axios from "axios"
import Button from "Components/Button"
import TextField from "Components/TextField"
import SSOContainer from "Components/SSOContainer"

function Signup(props) {
  var {
    handleChange,
    submit,
    email,
    password,
    fname,
    lname,
    errors = [],
  } = props
  function handleChangeBind(name) {
    return event => {
      handleChange(name, event.target.value)
    }
  }

  function passwordField() {
    return (
      <div>
        {/* <TextField
          label="Password"
          value={this.state.password}
          onChange={this.handleChange("password")}
          type="password"
        />
        <br /> */}
      </div>
    )
  }

  function generalError() {
    // const { errors } = this.state;
    // if (errors.length > 0) {
    //   const errorMsgs = errors.map((e, i) => {
    //     return <div key={i}>{e}</div>;
    //   });
    //   return <div className="error">{errorMsgs}</div>;
    // }
    return
  }

  return (
    <div className="signupForm">
      <SSOContainer />
      <div className="signupDetails">
        <div>
          <TextField
            label="First Name"
            value={fname}
            onChange={handleChangeBind("fname")}
          />
        </div>
        <div>
          <TextField
            label="Last Name"
            value={lname}
            onChange={handleChangeBind("lname")}
          />
        </div>
        <div>
          <TextField
            label="Email"
            value={email}
            onChange={handleChangeBind("email")}
          />
        </div>
        {passwordField()}
        {generalError()}
        {props["SIGNUP-ERROR"] && (
          <div className="error">{props["SIGNUP-ERROR"]}</div>
        )};
        <Button onClick={submit}>SignUp</Button>
      </div>
    </div>
  )
}

export default Signup
