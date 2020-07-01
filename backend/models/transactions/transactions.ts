import SQL from "../mysql-pool/mysql-pool"

import { Transaction, TransactionsQueryOptions } from "./types"

import baseDBModel from "../base-db-model/base-db-model"

export default class Leads extends baseDBModel<
  Transaction,
  Transaction,
  TransactionsQueryOptions
> {
  constructor(sql: SQL) {
    super(sql, "transactions")
  }

  public async addTransactions(transaction: Transaction) {
    return await this.insert(transaction)
  }

  public async getTransactions(condition: TransactionsQueryOptions, limit) {
    return this.find({ condition, limit })
  }

  public async getAllTransactions(condition, sort, limit) {
    const records = await this.find({ condition, sort, limit })
    const count = await this.count({ condition })
    return [records, count]
  }
}
