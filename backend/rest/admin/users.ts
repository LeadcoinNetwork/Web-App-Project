import * as Express from "express"
import AppLogic from "../../app-logic/index"
import * as passport from "passport"
import checkIsInRole from "../../midelvares/checkIsInRole"

const authOptions = {
  session: false,
}

export const start = ({
  appLogic,
  expressApp,
}: {
  appLogic: AppLogic
  expressApp: Express.Express
}) => {
  const getUsers = async (req, res) => {
    try {
      const { filter, range, sort } = req.query

      const _sort = { sortBy: sort[0], sortOrder: sort[1] }
      const limit = { start: range[0], offset: range[1] - range[0] + 1 }

      let condition
      if (filter && Object.keys(filter).length) {
        condition = filter
      }

      const [users, count]: any = await appLogic.users.getAllUsers(
        condition,
        _sort,
        limit,
      )

      let contentRange
      if (count === 0) contentRange = "*/0"
      else if (range) contentRange = `${range[0]}-${range[1]}/${count}`
      else contentRange = `${count - 1}/${count}`
      res.set("Content-Range", `users ${contentRange}`)
      res.json(users)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  const updateUser = async (req, res) => {
    try {
      const id = req.params.id
      const { role } = req.body
      await appLogic.users.updateRole(id, role)
      res.status(200).json({ id })
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  const getUser = async (req, res) => {
    try {
      const id = req.params.id
      const users = await appLogic.users.getOne({ id })
      res.status(200).json(users)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  expressApp
    .route("/api/admin/users")
    .all(passport.authenticate("jwt", authOptions), checkIsInRole("admin"))
    .get(getUsers)

  expressApp
    .route("/api/admin/users/:id")
    .all(passport.authenticate("jwt", authOptions), checkIsInRole("admin"))
    .put(updateUser)
    .get(getUser)
}
