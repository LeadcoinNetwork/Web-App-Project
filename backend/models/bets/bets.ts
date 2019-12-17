import SQL from "../mysql-pool/mysql-pool"

import { Bet, BetQueryOptions } from "./types"
import baseDBModel from "../base-db-model/base-db-model"

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
}
