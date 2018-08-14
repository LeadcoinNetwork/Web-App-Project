import Users from "./users"
import Leads from "./leads"
//import Blockchain from "./blockchain"
import Notifications from "./notifications"

export default class API {
  users: Users
  leads: Leads
  notifications: Notifications
  constructor(private request) {
    // Create new request object, that all API's will use.
    // This reuqest object transofrm a reject promise, and return it as an object.
    async function r() {
      try {
        var ans = await request.apply(null, arguments)
        if (ans.status >= 400 && !ans.body.error) {
          return {
            error: { req_error: "REQUEST_ERROR" },
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
            error: { net_error: "NETWORK_ERROR" },
          }
        }
      }
    }

    this.leads = new Leads(r)
    this.users = new Users(r)
    this.notifications = new Notifications(r)
    //@ts-ignore
    if (window) window.apiClient = this
  }
}
