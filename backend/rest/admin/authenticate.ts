import * as Express from "express"
import AppLogic from "../../app-logic/index"
import NotFound from "../../utils/not-found"

export const start = ({
  appLogic,
  expressApp,
}: {
  appLogic: AppLogic
  expressApp: Express.Express
}) => {
  const login = async (req, res) => {
    try {
      const { username, password } = req.body
      const user: any = await appLogic.models.users.getUserByEmailAndPassword(
        username,
        password,
      )
      if (user instanceof NotFound) {
        res.status(401).send()
      }
      const token = await appLogic.auth.loginUserNameAndPassword(user.id)
      res.cookie("token", token)
      res.json({ token })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  const logout = async (req, res) => {
    try {
      res.clearCookie("token")
      res.json({ logout: "success" })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  expressApp.route("/api/admin/authenticate/login").post(login)

  expressApp.route("/api/admin/authenticate/logout").post(logout)
}
