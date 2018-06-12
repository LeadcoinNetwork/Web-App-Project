import * as types from "./types"

export function signupFormHandleChange(name, value) {
  return {
    type: types.SIGNUP_FORM_HANDLE_CHANGE,
    payload: { name, value },
  }
}

export function SignUpFormUserSubmit() {
  return {
    type: types.SIGNUP_SUBMIT,
  }
}

export function SIGNUP_LOADING() {
  return {
    type: types.SIGNUP_LOADING,
  }
}

/* return (dispatch, getState) => {
    dispatch({ type: "SIGNUP_AJAX_START1" })

    const { fname, lname, password, email } = getState().users.signup

    var data = fetchBackend("POST", "/user", {
      fname,
      lname,
      email,
      password,
    })
      .then(data => {
        console.log("data", data)
        const { token, user } = data
        dispatch({ type: "SIGNUP_AJAX_START2" })
      })
      .catch(error => {
        dispatch({ type: "SIGNUP ERROR", message: "signup error" })
        if (error.response) {
          // error originated from server
          if (error.response.data.error) {
            let errors = error.response.data.error.split("; ")
          }
        }
        // } else if (error.request) {
        //         // request made, no response though
        //       } else {
        //         // error was thrown during request setup
        //       }
        //     });
      })
  }
} */
