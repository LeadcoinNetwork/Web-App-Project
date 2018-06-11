import * as Actions from "../actions"

export default function UserSignUpReducer(state, action) {
  var newState = Object.assign(
    {
      fname: "",
      lname: "",
      password: "",
      email: "a@a.com",
    },
    state,
  )
  switch (action.type) {
    case Actions.types.SIGNUP_FORM_HANDLE_CHANGE:
      newState[action.payload.name] = action.payload.value
      delete newState["SIGNUP-ERROR"]
      break

    case "SIGNUP ERROR":
      newState["SIGNUP-ERROR"] = action.message

    default:
      break
  }

  return newState
}
