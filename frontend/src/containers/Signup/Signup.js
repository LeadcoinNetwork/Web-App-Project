import React from "react"
import { connect } from "react-redux"
import Button from "Components/Button"
import TextField from "Components/TextField"
import SocialLogin from "Components/SocialLogin"
import { signup } from "Actions"
import tiger from "Images/tiger.jpg"
import { Link } from "react-router-dom"

class Signup extends React.Component {
  handleChange = event => {
    this.props.handleChange(event.target.name, event.target.value)
  }
  getErrors(errors) {
    return (
      <ul className="ldc-error-text">
        {errors.split(";").map(e => <li key={e}>{e}</li>)}
      </ul>
    )
  }
  render() {
    let { fname, lname, email, password, error, loading } = this.props.signup

    return (
      <section className="ldc-signup">
        <div className="s-main">
          <h1>Register to LeadCoin</h1>
          <div className="sm-social-buttons">
            <SocialLogin provider={"google"} />
            {/* <SocialLogin provider={"linkedin"} /> */}
          </div>
          <div className="sm-form">
            <h4>Or enter your details:</h4>
            <TextField
              placeholder="First Name"
              value={fname}
              name="fname"
              onChange={this.handleChange}
            />
            <TextField
              placeholder="Last Name"
              value={lname}
              name="lname"
              onChange={this.handleChange}
            />
            <TextField
              placeholder="Email"
              type="email"
              value={email}
              name="email"
              onChange={this.handleChange}
            />
            <TextField
              placeholder="Password"
              value={password}
              name="password"
              onChange={this.handleChange}
              type="password"
            />
            {error && this.getErrors(error)}
            <Button
              label="register"
              loading={loading}
              onClick={this.props.submit}
            />
            <p className="smf-agree">
              By clicking this button, you agree to our
              <br />
              <Link to="/terms">Terms & conditions</Link>
              &nbsp;and&nbsp;
              <Link to="/privacy">Privacy Policy</Link>
            </p>
          </div>
          <div />
        </div>
        <aside>
          <h3>LeadCoin is the promised land for marketers</h3>
          <q>
            Collaborating with other marketers & sharing leads is 10X more
            effcient than giving away my budget to Google & Facebook.
          </q>
          <label style={{ backgroundImage: `url(${tiger})` }}>
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
  signup: state.signup,
})

export default connect(
  mapStateToProps,
  {
    handleChange: signup.signupHandleChange,
    submit: signup.signupSubmit,
  },
)(Signup)
