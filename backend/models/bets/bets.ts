import SQL from "../mysql-pool/mysql-pool"

import { Bet, BetQueryOptions } from "./types"
import baseDBModel from "../base-db-model/base-db-model"
import { TransactionsQueryOptions } from "@/models/transactions/types"

export default class Bets extends baseDBModel<Bet, Bet, BetQueryOptions> {
  constructor(sql: SQL) {
    super(sql, "bets")
  }

  public async addBet(Bet: Bet) {
    return await this.insert(Bet)
  }

  public async getBet(condition: BetQueryOptions) {
    const [record] = await this.find({ condition })
    return record
  }

  public async getAllBets(condition, sort, limit) {
    const records = await this.find({ condition, sort, limit })
    const count = await this.count({ condition })
    return [records, count]
  }
}
