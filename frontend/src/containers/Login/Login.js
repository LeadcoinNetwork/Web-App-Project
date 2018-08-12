import React from "react"
import { connect } from "react-redux"
import Button from "Components/Button"
import TextField from "Components/TextField"
import Checkbox from "Components/Checkbox"
import SocialLogin from "Components/SocialLogin"
import { Link } from "react-router-dom"
import { login } from "Actions"
import tiger from "Images/tiger.jpg"
import t from "../../utils/translate/translate"

class Login extends React.Component {
  handleChange = event => {
    let target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value

    this.props.handleChange(target.name, value)
  }

  render() {
    let { email, password, remember, loading, error } = this.props.login

    return (
      <section className="ldc-login">
        <div className="l-main">
          <h1>{t("Login")}</h1>
          <div className="lm-social-buttons">
            <SocialLogin
              connectWithText={t("connect with")}
              provider="google"
            />
            {/* <SocialLogin connectWithText={t("connect with")} provider="linkedin" /> */}
          </div>
          <div className="lm-form">
            <h4>{t("Or enter your details:")}</h4>
            <TextField
              className={"email" + (error.credentials ? " error" : "")}
              placeholder={t("Email")}
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <TextField
              className={"password" + (error.credentials ? " error" : "")}
              placeholder={t("Password")}
              name="password"
              value={password}
              onChange={this.handleChange}
              type="password"
            />
            <p className="lmf-remember">
              <Checkbox
                name="remember"
                label={t("Remember me")}
                checked={remember}
                onClick={this.handleChange}
              />
              <Link to="/forgot-password">{t("Forgot your password?")}</Link>
            </p>
            {error && (
              <div className="errors">
                {Object.keys(error).map((error_i, index) => (
                  <div key={index}>{t(error[error_i])}</div>
                ))}
              </div>
            )}
            <Button
              label={t("Login")}
              loading={loading}
              onClick={this.props.submit}
            />
          </div>
        </div>
        <aside>
          <h3>{t("LeadCoin is the promised land for marketers")}</h3>
          <q>
            {t(
              "Collaborating with other marketers & sharing leads is 10X more efficient than giving away my budget to Google & Facebook.",
            )}
          </q>
          <label style={{ backgroundImage: `url(${tiger})` }}>
            <span>
              {t("Meir Cohen")}
              <br />
              {t("CEO of Crypto")}
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

export default connect(
  mapStateToProps,
  {
    handleChange: login.loginHandleChange,
    submit: login.loginUserSubmit,
  },
)(Login)
