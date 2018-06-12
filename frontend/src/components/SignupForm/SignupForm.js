import React from "react"
import Button from "Components/Button"
import TextField from "Components/TextField"
import SocialLogin from "Components/SocialLogin"

const SignupForm = ({ name, email, password, error, handleChange, submit }) => {
  const handleChangeBind = name => event =>
    handleChange(name, event.target.value)

  return (
    <div className="ldc-signup-form">
      <h1>Register to LeadCoin</h1>
      <SocialLogin provider={"google"} />
      <SocialLogin provider={"linkedin"} />
      <TextField
        label="name"
        value={name}
        onChange={handleChangeBind("name")}
      />
      <TextField
        label="email"
        value={email}
        onChange={handleChangeBind("email")}
      />
      <TextField
        label="Password"
        value={password}
        onChange={handleChangeBind("password")}
        type="password"
      />
      <div>{error}</div>
      <Button onClick={submit} label="signup" />
    </div>
  )
}

export default SignupForm
