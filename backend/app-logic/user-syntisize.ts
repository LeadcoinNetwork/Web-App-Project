import { ExistingUserInterface } from "../models/users/types"
export default function userSyntisize(
  user: ExistingUserInterface,
): ExistingUserInterface {
  var newUser = <ExistingUserInterface>Object.assign(user)
  delete newUser.emailConfirmationKey
  delete newUser.password
  return newUser
}
