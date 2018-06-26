import AppLogic from "./index"
import NotFound from "../utils/not-found"
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
  async login(email, password): Promise<string | NotFound> {
    let user = await this.appLogic.users.getUserByEmailAndPassword(
      email,
      password,
    )
    if (user instanceof NotFound) {
      return new NotFound()
    } else {
      return "stam-token"
    }
  }
}
