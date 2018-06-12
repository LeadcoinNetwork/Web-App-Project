import React from "react"
import Button from "Components/Button"
import TextField from "Components/TextField"
import SSOContainer from "Components/SSOContainer"

const Signup = ({
  handleChange,
  submit,
  email,
  password,
  fname,
  lname,
  errors,
}) => {
  const handleChangeBind = name => event =>
    handleChange(name, event.target.value)

  const generalError = () => {
    if (errors && errors.length > 0) {
      const errorMsgs = errors.map((e, i) => {
        return <div key={i}>{e}</div>
      })
      return <div className="error">{errorMsgs}</div>
    }
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
        <TextField
          label="Password"
          value={password}
          onChange={handleChange("password")}
          type="password"
        />
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
