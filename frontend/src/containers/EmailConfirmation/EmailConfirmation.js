import React from "react"
import Button from "Components/Button"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { user } from "Actions"

const EmailConfirmation = ({ user, logout }) => (
  <section className="ldc-email-confirmation">
    We have sent you an email with a confirmation link
    <br />
    <br />
    You logged in as {user.email}
    <br />
    <br />
    Not you?{" "}
    <Link to="/login" onClick={logout}>
      Logout
    </Link>
    <br />
    <br />
    Don't find the email?
    <bt />
    <bt />
    <Button label="Resend" />
  </section>
)

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, {
  logout: user.loggedOut,
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
