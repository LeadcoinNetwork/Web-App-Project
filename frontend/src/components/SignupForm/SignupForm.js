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
        placeholder="First Name"
        value={fname}
        onChange={handleChangeBind("fname")}
      />
      <TextField
        placeholder="Last Name"
        value={lname}
        onChange={handleChangeBind("lname")}
      />
      <br />
      <TextField
        placeholder="Email"
        value={email}
        onChange={handleChangeBind("email")}
      />
      <br />
      <TextField
        placeholder="Password"
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
