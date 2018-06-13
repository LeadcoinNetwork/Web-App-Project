import { connect } from "react-redux"
import SignupForm from "Components/SignupForm"
import { signup } from "Actions"

var mapStateToProps = state => state.signup

var mapDispatchToProps = {
  handleChange: signup.signupFormHandleChange,
  submit: signup.SignUpFormUserSubmit,
}

var SignupConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupForm)

export default SignupConnected
