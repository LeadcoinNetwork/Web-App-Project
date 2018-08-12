import React from "react"
import { connect } from "react-redux"
import Button from "Components/Button"
import TextField from "Components/TextField"
import SocialLogin from "Components/SocialLogin"
import { signup } from "Actions"
import tiger from "Images/tiger.jpg"
import { Link } from "react-router-dom"
import t from "../../utils/translate/translate"

class Signup extends React.Component {
  handleChange = event => {
    this.props.handleChange(event.target.name, event.target.value)
  }
  getErrors(errors) {
    return (
      <ul className="ldc-error-text">
        {errors.split(";").map(e => <li key={e}>{t(e)}</li>)}
      </ul>
    )
  }
  render() {
    let { fname, lname, email, password, errors, loading } = this.props.signup

    return (
      <section className="ldc-signup">
        <div className="s-main">
          <h1>{t("Register to LeadCoin")}</h1>
          <div className="sm-social-buttons">
            <SocialLogin
              connectWithText={t("connect with")}
              provider={"google"}
            />
            {/* <SocialLogin connectWithText={t("connect with")} provider={"linkedin"} /> */}
          </div>
          <div className="sm-form">
            <h4>{t("Or enter your details:")}</h4>
            <TextField
              className={"fname" + (errors.fname ? " error" : "")}
              placeholder={t("First Name")}
              value={fname}
              name="fname"
              onChange={this.handleChange}
            />
            <TextField
              className={"lname" + (errors.lname ? " error" : "")}
              placeholder={t("Last Name")}
              value={lname}
              name="lname"
              onChange={this.handleChange}
            />
            <TextField
              className={"email" + (errors.email ? " error" : "")}
              placeholder={t("Email")}
              type="email"
              value={email}
              name="email"
              onChange={this.handleChange}
            />
            <TextField
              className={"password" + (errors.password ? " error" : "")}
              placeholder={t("Password")}
              value={password}
              name="password"
              onChange={this.handleChange}
              type="password"
            />
            {errors && (
              <div className="errors">
                {Object.keys(errors).map((error, index) => (
                  <div key={index}>{t(errors[error])}</div>
                ))}
              </div>
            )}
            <Button
              label={t("register")}
              loading={loading}
              onClick={this.props.submit}
            />
            <p className="smf-agree">
              {t("By clicking this button, you agree to our")}
              <br />
              <Link to="/terms">{t("Terms & conditions")}</Link>
              &nbsp;{t("and")}&nbsp;
              <Link to="/privacy">{t("Privacy Policy")}</Link>
            </p>
          </div>
          <div />
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
  signup: state.signup,
})

export default connect(
  mapStateToProps,
  {
    handleChange: signup.signupHandleChange,
    submit: signup.signupSubmit,
  },
)(Signup)
