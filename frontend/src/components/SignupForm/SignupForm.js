import React from "react"
import Button from "Components/Button"
import TextField from "Components/TextField"
import SocialLogin from "Components/SocialLogin"

const SignupForm = ({
  fname,
  lname,
  email,
  password,
  error,
  handleChange,
  submit,
  loading,
}) => {
  const handleChangeBind = name => event =>
    handleChange(name, event.target.value)

  return (
    <div className="ldc-signup-form">
      <h1>Register to LeadCoin</h1>
      <SocialLogin provider={"google"} />
      <SocialLogin provider={"linkedin"} />
      <br />
      <TextField
        label="First Name"
        value={fname}
        onChange={handleChangeBind("fname")}
      />
      <TextField
        label="Last Name"
        value={lname}
        onChange={handleChangeBind("lname")}
      />
      <br />
      <TextField
        label="Email"
        value={email}
        onChange={handleChangeBind("email")}
      />
      <br />
      <TextField
        label="Password"
        value={password}
        onChange={handleChangeBind("password")}
        type="password"
      />
      <div />
      {error && error.split(";").map(e => <div>{e}</div>)}
      <Button loading={loading} onClick={submit} label="signup" />
    </div>
  )
}

export default SignupForm
