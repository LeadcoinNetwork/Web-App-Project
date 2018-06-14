import React from "react"
import { connect } from "react-redux"
import Button from "Components/Button"
import TextField from "Components/TextField"
import SocialLogin from "Components/SocialLogin"
import { signup } from "Actions"

class Signup extends React.Component {
  handleChange = event => {
    this.props.handleChange(event.target.name, event.target.value)
  }
  render() {
    console.log(this)
    let {
      fname,
      lname,
      email,
      password,
      error,
      submit,
      loading,
    } = this.props.signup

    return (
      <section className="ldc-signup">
        <h1>Register to LeadCoin</h1>
        <div className="s-social-buttons">
          <SocialLogin provider={"google"} />
          <SocialLogin provider={"linkedin"} />
        </div>
        <div className="s-form">
          <p>Or enter your details:</p>
          <TextField
            placeholder="First Name"
            value={fname}
            name="fname"
            onChange={this.handleChangeBind}
          />
          <TextField
            placeholder="Last Name"
            value={lname}
            name="lname"
            onChange={this.handleChangeBind}
          />
          <TextField
            placeholder="Email"
            value={email}
            name="email"
            onChange={this.handleChangeBind}
          />
          <TextField
            placeholder="Password"
            value={password}
            name="password"
            onChange={this.handleChangeBind}
            type="password"
          />
          <Button loading={loading} onClick={submit} label="register" />
          <p className="sf-agree">
            By clicking this button, you agree to our
            <br />
            <a href="https://www.google.com" target="_blank">
              Terms & conditions
            </a>
            &nbsp;and&nbsp;
            <a href="https://www.google.com" target="_blank">
              Privacy Policy
            </a>
          </p>
        </div>
        {error && error.split(";").map(e => <div>{e}</div>)}
        <div />
      </section>
    )
  }
}

var mapStateToProps = state => ({
  signup: state.signup,
})

var mapDispatchToProps = {
  handleChange: signup.signupFormHandleChange,
  submit: signup.SignUpFormUserSubmit,
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
