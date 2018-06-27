import AppLogic from "./index"
import NotFound from "../utils/not-found"
import * as userAuth from "../models/user-auth/user-auth"
export default class UserLogin {
  // async login(userId): Promise<string> {
  // let user = (await this.find({ id: userId }))[0]
  // let token = auth.generateJWT(user)
  // if (user.disabled) {
  // return token
  // }
  // update login timestamp
  // await UserMySQL.
  // (user.id, { login: Date.now() })
  // return token
  // }
  constructor(private appLogic: AppLogic) {}
  async login(user_id): Promise<string> {
    return userAuth.generateJWT(user_id, this.appLogic.config.auth.jwt.secret)
  }
}
