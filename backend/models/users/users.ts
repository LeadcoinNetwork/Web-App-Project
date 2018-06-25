const auth = require("../auth/auth")
const mysql = require("mysql")

const validate = require("../validate/validate")
const TokenMySQL = require("../token-mysql/token-mysql")
const sql = require("../mysql-pool/mysql-pool")

import EmailCreator from "../email-creator/email-creator"
import EmailSender from "../emailsender/abstraction"
import EmailSenderError from "../emailsender/error"

interface UserActionsConstructor {}

import {
  NewUserInterface,
  ExistingUserInterface,
  ExistingUserInterfaceCondition,
} from "./types"

import { GoPromise } from "../../utils/GoPromise"

class User {
  constructor(props?: UserActionsConstructor) {
    Object.assign(this, props)
  }

  async createUser(user: NewUserInterface): GoPromise<ExistingUserInterface> {
    let { email } = user
    var [result] = await this.getOne({ email })
    if (result) {
      return [null, new Error("user email already exists")]
    }
    let status = await sql.query("INSERT INTO users SET ?", user)
    if (status.affectedRows != 0) {
      return [null, new Error("user not inserted")]
    } else {
      return await this.getOne({ id: status.insertId })
    }
  }

  /**
   * If not found, or found more than one return an error.
   */
  private async getOne(
    condition: ExistingUserInterfaceCondition,
  ): GoPromise<ExistingUserInterface> {
    var [result] = await this.find(condition)
    if (result.length != 1) {
      return [
        null,
        new Error(
          "must return only 1 user, but returned " + result.length + " users",
        ),
      ]
    } else {
      return [result[0], null]
    }
  }

  // If not found, not returing an error.
  private async find(
    condition: ExistingUserInterfaceCondition,
  ): GoPromise<ExistingUserInterface[]> {
    var cnd = Object.keys(condition)
      .map(key => {
        return `${mysql.escpaeId(key)} = ${mysql.escape(condition[key])}`
      })
      .join(" AND ")

    if (cnd) cnd = `WHERE ${cnd}`

    let rows = await sql.query(`SELECT * FROM users ${cnd}`)
    rows = rows.map(row => Object.assign({}, row)) // remove RowDataPacket class

    return [rows, null]
  }

  async delete(userId): GoPromise<boolean> {
    let status = await sql.query("DELETE FROM users WHERE id = ?", userId)
    return [status.affectedRows != 0, null]
  }

  async activateUser({ user_id }: { user_id: number }) {
    return await this.update(user_id, { disabled: null })
  }

  // returns user
  async getUserByEmailAndPassword(
    email,
    password,
  ): GoPromise<ExistingUserInterface> {
    let [user, error] = await this.getOne({ email })
    if (error) {
      return [null, error]
    }
    if (!auth.comparePassword(password, user.password)) {
      return [null, new Error("Unauthorized")]
    } else {
      return [user, null]
    }
  }

  async update(
    userId,
    user: ExistingUserInterfaceCondition,
  ): GoPromise<ExistingUserInterface> {
    let { email, password } = user

    if (password) {
      password = auth.hashPassword(password)
    }

    var values = Object.keys(user)
      .map(key => {
        return `${mysql.escape("$." + key)} , ${mysql.escape(user[key])}`
      })
      .join(" , ")

    let status = await sql.query(
      "UPDATE users SET user=JSON_SET(user," + values + ") WHERE id = ?",
      [userId],
    )
    if (status.affectedRows != 0) {
      return [null, new Error("user not updated")]
    } else {
      return await this.getOne({ id: userId })
    }
  }

  async insertToken(token) {
    let status = await sql.query("INSERT INTO tokens SET ?", token)
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

    let rows = await sql.query(`SELECT ${fields} FROM tokens ${condition}`)
    rows = rows.map(row => Object.assign({}, row)) // remove RowDataPacket class
    return rows
  }

  async removeToken(userId) {
    let status = await sql.query("DELETE FROM tokens WHERE user_id = ?", userId)
    return status.affectedRows != 0
  }
}

export default User
