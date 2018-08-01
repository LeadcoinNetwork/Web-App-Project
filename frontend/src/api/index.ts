import Users from "./users"
import Leads from "./leads"

export default class API {
  users: Users
  leads: Leads
  constructor(private request) {
    // Create new request object, that all API's will use.
    // This reuqest object transofrm a reject promise, and return it as an object.
    async function r() {
      try {
        var ans = await request.apply(null, arguments)
        if (ans.status >= 400 && !ans.body.error) {
          return {
            error: "REQUEST_ERROR",
            status: ans.status,
          }
        }
        return ans.body || {}
      } catch (err) {
        if (err.response && err.response.body) {
          return {
            error: err.response.body.error,
          }
        } else {
          return {
            error: "NETWORK_ERROR",
          }
        }
      }
    }

    this.leads = new Leads(r)
    this.users = new Users(r)
    //@ts-ignore
    if (window) window.apiClient = this
  }
}
