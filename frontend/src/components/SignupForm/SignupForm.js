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
        label="fname"
        value={fname}
        onChange={handleChangeBind("fname")}
      />
      <TextField
        label="fname"
        value={lname}
        onChange={handleChangeBind("lname")}
      />
      <br />
      <TextField
        label="email"
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
