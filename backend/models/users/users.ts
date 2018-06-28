import * as auth from "../user-auth/user-auth"
const mysql = require("mysql")

const validate = require("../user-validate/user-validate")
import SQL from "../mysql-pool/mysql-pool"

import NotFound from "../../utils/not-found"

import {
  NewUserInterface,
  disabledResons,
  ExistingUserInterface,
  ExistingUserInterfaceCondition,
} from "./types"

class User {
  constructor(private sql: SQL) {}

  async deleteAll() {
    return this.sql.query("delete from users")
  }

  async createUser(user: NewUserInterface): Promise<number> {
    let { email } = user
    var exist = await this.exist({ email })
    if (exist) {
      throw new Error("user email already exists")
    }
    var user2Databse = <any>user
    if (user.plainPassword) {
      user2Databse.password = auth.hashPassword(user.plainPassword)
      delete user2Databse.plainPassword
    }
    let status = await this.sql.query("INSERT INTO users SET ?", user2Databse)
    if (!status.insertId) {
      throw new Error("user not inserted")
    } else {
      return status.insertId
      // return this.getOne({ id: status.insertId })
    }
  }
  async setNewPassword(user_id, new_password): Promise<boolean> {
    var hashed_password = auth.hashPassword(new_password)
    return this.update(user_id, { password: hashed_password })
  }

  private async exist(
    condition: ExistingUserInterfaceCondition,
  ): Promise<boolean> {
    var result = await this.find(condition)
    return result.length > 0
  }
  public async getOne(
    condition: ExistingUserInterfaceCondition,
    settings: { returnPassword: boolean } = { returnPassword: false },
  ): Promise<ExistingUserInterface | NotFound> {
    var result = await this.find(condition, settings)
    if (result.length != 1) {
      return new NotFound()
    } else {
      return result[0]
    }
  }

  // If not found, not returing an error.
  public async find(
    condition: ExistingUserInterfaceCondition,
    settings: { returnPassword: boolean } = { returnPassword: false },
  ): Promise<ExistingUserInterface[]> {
    var cnd = Object.keys(condition)
      .map(key => {
        return `${mysql.escapeId(key)} = ${mysql.escape(condition[key])}`
      })
      .join(" AND ")

    if (cnd) cnd = `WHERE ${cnd}`

    let rows = await this.sql.query(`SELECT * FROM users ${cnd}`)
    rows = rows.map(row => {
      // remove RowDataPacket class
      var newObject = Object.assign({}, row)
      if (!settings.returnPassword) {
        delete newObject.password
      }
      return newObject
    })

    return rows
  }

  async delete(userId): Promise<boolean> {
    let status = await this.sql.query("DELETE FROM users WHERE id = ?", userId)
    return status.affectedRows != 0
  }

  async activateUser({ user_id }: { user_id: number }) {
    return await this.update(user_id, { disabled: null })
  }

  // returns user
  async getUserById(id): Promise<ExistingUserInterface | NotFound> {
    let user = await this.getOne({ id })
    return user
  }

  async getUserByEmailAndPassword(
    email,
    password,
  ): Promise<ExistingUserInterface | NotFound> {
    let user = await this.getOne({ email }, { returnPassword: true })
    if (user instanceof NotFound) {
      return new NotFound()
    }
    if (!auth.comparePassword(password, user.password)) {
      return new NotFound()
    } else {
      return user
    }
  }

  async update(userId, user: ExistingUserInterfaceCondition): Promise<boolean> {
    let { email, password } = user

    if (password) {
      password = auth.hashPassword(password)
    }

    var values = Object.keys(user)
      .map(key => {
        return `${mysql.escapeId(key)} = ${mysql.escape(user[key])}`
      })
      .join(" , ")

    let status = await this.sql.query(
      `UPDATE users SET ${values}  WHERE id = ${mysql.escape(userId)}`,
    )
    if (status.affectedRows == 0) {
      throw new Error("user not updated")
    } else {
      return true
    }
  }

  async insertToken(token) {
    let status = await this.sql.query("INSERT INTO tokens SET ?", token)
    return status.affectedRows != 0
  }

  async findToken(condition, fields) {
    // convert condition to WHERE clause
    condition = Object.keys(condition)
      .map(key => {
        return `${key} = '${condition[key]}'`
      })
      .join(" AND ")

    if (condition) condition = `WHERE ${condition}`

    // convert fields to SELECT statement
    if (Array.isArray(fields) && fields.length) {
      fields = fields.join(", ")
    } else {
      fields = "*"
    }

    let rows = await this.sql.query(`SELECT ${fields} FROM tokens ${condition}`)
    rows = rows.map(row => Object.assign({}, row)) // remove RowDataPacket class
    return rows
  }

  async removeToken(userId) {
    let status = await this.sql.query(
      "DELETE FROM tokens WHERE user_id = ?",
      userId,
    )
    return status.affectedRows != 0
  }
}

export default User
