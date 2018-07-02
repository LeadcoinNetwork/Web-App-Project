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
    <div className="ldc-error-text">{emailConfirmation.error}</div>
  </section>
)

const mapStateToProps = state => ({
  user: state.user,
  emailConfirmation: state.emailConfirmation,
})

export default connect(mapStateToProps, {
  logout: actions.user.loggedOut,
  resend: actions.emailConfirmation.emailConfirmationResend,
})(EmailConfirmation)

// resendEmail = () => {
//   axios.defaults.withCredentials = true
//   axios.defaults.headers.common["Authorization"] =
//   "Bearer " + this.props.token
//   axios
//   .get(`${process.env.BACKEND}/auth/resend-email`)
//   .then(response => {
//     this.setState({ response: "Email Sent!" })
//   })
//   .catch(error => {
//     if (error.response) {
//       // error originated from server
//       if (error.response.data.error) {
//         let errors = error.response.data.error.split("; ")
//         this.setState({ errors: errors })
//       }
//     } else if (error.request) {
//       // request made, no response though
//     } else {
//       // error was thrown during request setup
//     }
//   })
// }

//    x
