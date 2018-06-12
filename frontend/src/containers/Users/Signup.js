import { connect } from "react-redux"
import SignupForm from "Components/SignupForm"
import { signup } from "../../actions"

var mapStateToProps = state => ({
  signup: state.signup,
})

var mapDispatchToProps = {
  handleChange: signup.signupFormHandleChange,
  submit: signup.SignUpFormUserSubmit,
}

var SignupConnected = connect(mapStateToProps, mapDispatchToProps)(SignupForm)

export default SignupConnected

// submit = () => {
//     const { fname, lname, password, email } = this.state
//     axios
//       .post(`${process.env.BACKEND}/user`, {
//         fname,
//         lname,
//         email,
//         password,
//       })
//       .then(({ data }) => {
//         const { token, user } = data
//         this.props.setUser(user)
//         this.props.saveToken(token)
//       })
//       .catch(error => {
//         if (error.response) {
//           // error originated from server
//           if (error.response.data.error) {
//             let errors = error.response.data.error.split("; ")
//             this.setState({ errors: errors })
//           }
//         } else if (error.request) {
//           // request made, no response though
//         } else {
//           // error was thrown during request setup
//         }
//       })
//   }
