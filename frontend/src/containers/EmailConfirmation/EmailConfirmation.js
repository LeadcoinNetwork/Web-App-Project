import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "Actions"
import t from "../../utils/translate/translate"

const EmailConfirmation = ({ user, emailConfirmation, logout, resend }) => (
  <section className="ldc-email-confirmation">
    <h1>{t("Please verify your email")}</h1>
    <p>
      {t("Verification email sent to")} {user && user.email}{" "}
      <a href="javascript:console.log" onClick={resend}>
        {t("Resend")}
      </a>
    </p>
    <p>
      {t("Not you?") + " "}
      <Link to="/login" onClick={logout}>
        {t("Logout")}
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
