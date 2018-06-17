import React from "react"
import { connect } from "react-redux"
import Button from "Components/Button"
import TextField from "Components/TextField"
import Checkbox from "Components/Checkbox"
import SocialLogin from "Components/SocialLogin"
import { Link } from "react-router-dom"
import { login } from "Actions"
import t from "Images/t.jpg"

class Login extends React.Component {
  handleChange = event => {
    let target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value

    this.props.handleChange(target.name, value)
  }
  getErrors(errors) {
    return (
      <ul className="ldc-error-text">
        {errors.split(";").map(e => <li>{e}</li>)}
      </ul>
    )
  }
  render() {
    let { email, password, remember, loading, error } = this.props.login

    return (
      <section className="ldc-login">
        <div className="l-main">
          <h1>Login</h1>
          <div className="lm-social-buttons">
            <SocialLogin provider="google" />
            <SocialLogin provider="linkedin" />
          </div>
          <div className="lm-form">
            <h4>Or enter your details:</h4>
            <TextField
              placeholder="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <TextField
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
              type="password"
            />
            <p className="lmf-remember">
              <Checkbox
                name="remember"
                label="Remember me"
                checked={remember}
                onClick={this.handleChange}
              />
              <Link to="/">Forgot your password?</Link>
            </p>
            {error && this.getErrors(error)}
            <Button
              label="login"
              loading={loading}
              onClick={this.props.submit}
            />
          </div>
        </div>
        <aside>
          <h3>LeadCoin is the promised land for marketers</h3>
          <q>
            Collaborating with other marketers & sharing leads is 10X more
            effcient than giving away my budget to Google & Facebook.
          </q>
          <label style={{ backgroundImage: `url(${t})` }}>
            <span>
              Meir Cohen<br />CEO of Crypto
            </span>
          </label>
        </aside>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  login: state.login,
})

export default connect(mapStateToProps, {
  handleChange: login.loginFormHandleChange,
  submit: login.loginFormUserSubmit,
})(Login)
