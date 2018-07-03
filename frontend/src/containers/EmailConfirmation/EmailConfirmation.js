import React from "react"
import Button from "Components/Button"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "Actions"

const EmailConfirmation = ({ user, emailConfirmation, logout, resend }) => (
  <section className="ldc-email-confirmation">
    <h1>Please verify your email</h1>
    <p>
      Verification email sent to {user.email}{" "}
      <a href="javascript:console.log" onClick={resend}>
        Resend
      </a>
    </p>
    <p>
      Not you?{" "}
      <Link to="/login" onClick={logout}>
        Logout
      </Link>
    </p>
  </section>
)

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, {
  logout: actions.user.loggedOut,
  resend: actions.emailConfirmation.emailConfirmationResend,
})(EmailConfirmation)
