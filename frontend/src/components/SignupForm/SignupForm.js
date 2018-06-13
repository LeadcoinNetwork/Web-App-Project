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
      <div className="sf-social-buttons">
        <SocialLogin provider={"google"} />
        <SocialLogin provider={"linkedin"} />
      </div>
      <div className="sf-form">
        <p>Or enter your details:</p>
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
        <TextField
          placeholder="Email"
          value={email}
          onChange={handleChangeBind("email")}
        />
        <TextField
          placeholder="Password"
          value={password}
          onChange={handleChangeBind("password")}
          type="password"
        />
        <Button loading={loading} onClick={submit} label="register" />
        <p className="sff-agree">
          By clicking this button, you agree to our
          <br />
          <a href="www.google.com">Terms & conditions</a>
          &nbsp;and&nbsp;
          <a href="www.google.com">Privacy Policy</a>
        </p>
      </div>
      {error && error.split(";").map(e => <div>{e}</div>)}
      <div />
    </div>
  )
}

export default SignupForm
