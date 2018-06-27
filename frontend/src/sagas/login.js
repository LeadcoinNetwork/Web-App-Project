import * as Actions from "Actions"
import { put, call } from "redux-saga/effects"
import request from "Utils/request"
import { push } from "react-router-redux"

export default function* login() {
  // fetch("http://127.0.0.1.xip.io:3000/me", { credentials: "include" })
  var ans = yield call(request, "GET", "/me")
  if (ans.isError) {
    yield put(push("/"))
  } else {
    if (ans.user.disabled == "EMAIL_NOT_VERIFIED") {
      yield put(Actions.user.loggedOut())
    } else {
      yield put(Actions.user.loggedIn(ans.user))
      yield put(push("/buy-leads"))
    }
  }
}
// login() {
//     const { password, email } = this.state
//     axios.defaults.withCredentials = true
//     axios
//       .post(`${process.env.BACKEND}/auth/login`, {
//         email,
//         password,
//       })
//       .then(response => {
//         const { user, token } = response.data
//         const { phone, country, company } = user
//         this.props.setUser(user)
//         this.props.saveToken(token)
//         if (user.disabled) {
//           this.props.navigate("emailVerification")
//         } else if (phone && country && company) {
//           this.props.navigate("dashboard")
//         } else {
//           this.props.navigate("userDetails")
//         }
//       })
//       .catch(e => {
//         if (e.response) {
//           // error originated from server
//           if (e.response.data.error) {
//             const { error } = e.response.data
//             switch (error) {
//               case "Unauthorized":
//                 this.setState({ error })
//                 break
//               case "EMAIL_NOT_VERIFIED":
//                 this.props.navigate("emailVerification")
//                 break
//             }
//           }
//         } else if (e.request) {
//           // request made, no response though
//         } else {
//           // error was thrown during request setup
//         }
//       })
//   }
