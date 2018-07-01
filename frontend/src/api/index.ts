import { SuperAgentStatic } from "superagent"

import Users from "./users"
export default class API {
  users: Users
  constructor(private request) {
    // Create new request object, that all API's will use.
    // This reuqest object transofrm a reject promise, and return it as an object.
    async function r() {
      try {
        var ans = await request.apply(null, arguments)
        return ans.body
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

    this.users = new Users(r)
  }
}
