import React from "react"
import TextField from "Components/TextField"
import Button from "Components/Button"

const ForgotPassword = props => (
  <section className="ldc-forgot-password">
    <h1>Forgot your password?</h1>
    <p>
      Enter the email address associated with your account, and we’ll email you
      a link to reset your password.
    </p>
    <TextField placeholder="Email" name="email" vlaue={""} />
    <Button label="Send Reset Link" />
  </section>
)

export default ForgotPassword
