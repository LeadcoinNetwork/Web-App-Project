import { ExistingUserInterface } from "../models/users/types"
declare namespace Express {
  interface Request {
    files?
    user: ExistingUserInterface | undefined
  }
}
