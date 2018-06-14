import React from "react"
import Button from "Components/Button"
import TextField from "Components/TextField"
import Checkbox from "Components/Checkbox"
import SocialLogin from "Components/SocialLogin"
import { connect } from "react-redux"
import * as actions from "Actions"

function LoginForm({ email, password, remember, error, handleChange, submit }) {
  const handleChangeBind = name => event => {
    if (typeof event == "boolean") {
      handleChange(name, event)
    } else {
      handleChange(name, event.target.value)
    }
  }

  return (
    <div className="loginForm">
      <div className="login_containers">
        <div className="login_header"> Login.</div>
        <SocialLogin provider="google" />
        <SocialLogin provider="linkedin" />
        <div className="localLogin">
          <form className="lo" onSubmit={submit}>
            <div> Or enter your details. </div>
            <div>
              <TextField
                placeholder="Email"
                value={email}
                onChange={handleChangeBind("email")}
              />
            </div>
            <div>
              <TextField
                placeholder="Password"
                value={password}
                onChange={handleChangeBind("password")}
                type="password"
              />
            </div>
            <div className="flexed login_helpers">
              <div className="remember_me">
                <Checkbox
                  label="Simple with controlled value"
                  checked={remember}
                  onClick={handleChangeBind("remember")}
                />
                <span> Remember me? </span>
              </div>
              <div className=""> Forgot your password? </div>
            </div>
            <div className="alignRight">
              <Button
                label="Login"
                onClick={e => {
                  e.preventDefault()
                  submit()
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

var mapStateToProps = state => state.login

var mapDispatchToProps = {
  handleChange: actions.login.loginFormHandleChange,
  submit: actions.login.loginFormUserSubmit,
}

var LoginFormConnected = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default LoginFormConnected
