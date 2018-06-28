import React from "react"
import Button from "Components/Button"

const EmailConfirmation = props => (
  <section className="ldc-email-confirmation">
    We sent you an email, Please click on the link
    <br />
    <br />
    <Button label="Resend" />
  </section>
)

export default EmailConfirmation

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
