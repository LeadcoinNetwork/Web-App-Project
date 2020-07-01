import decodeJwt from "jwt-decode"

export default {
  login: ({ username, password }) => {
    const request = new Request("/api/admin/authenticate/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    })
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(({ token }) => {
        const decodedToken = decodeJwt(token)
        localStorage.setItem("token", token)
        localStorage.setItem("permissions", decodedToken.permissions)
      })
  },
  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("permissions")

    const request = new Request("/api/admin/authenticate/logout", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
    })
    return fetch(request).then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText)
      }
    })
  },
  checkError: error => {
    const status = error.status
    if (status === 401 || status === 403) {
      localStorage.removeItem("token")
      return Promise.reject()
    }
    return Promise.resolve()
  },
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject()
  },
  getPermissions: () => {
    const role = localStorage.getItem("permissions")
    return role ? Promise.resolve(role) : Promise.reject()
  },
}
