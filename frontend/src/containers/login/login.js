import React from "react"
import { connect } from "react-redux"
import Button from "../../components/button"
import TextField from "../../components/textField"
import Checkbox from "../../components/checkbox"
import SocialLogin from "../../components/socialLogin"
import { Link } from "react-router-dom"
import { login } from "../../actions"
import tiger from "../../images/tiger.jpg"
import t from "../../utils/translate/translate"

class Login extends React.Component {
  handleChange = event => {
    let target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value

    this.props.handleChange(target.name, value)
  }
  getErrors(errors) {
    return (
      <ul className="ldc-error-text">
        {errors.split(";").map(e => <li key={e}>{e}</li>)}
      </ul>
    )
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
              placeholder={t("Email")}
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <TextField
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
            {error && this.getErrors(error)}
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

export default connect(mapStateToProps, {
  handleChange: login.loginHandleChange,
  submit: login.loginUserSubmit,
})(Login)
