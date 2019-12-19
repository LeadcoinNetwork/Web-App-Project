import SQL from "../mysql-pool/mysql-pool"

import { Auction, AuctionQueryOptions } from "./types"
import baseDBModel from "../base-db-model/base-db-model"

export default class Auctions extends baseDBModel<
  Auction,
  Auction,
  AuctionQueryOptions
> {
  constructor(sql: SQL) {
    super(sql, "auctions")
  }

  public async addAuction(auction: Auction) {
    return await this.insert(auction)
  }

  public async getAuction(
    condition: AuctionQueryOptions,
    statuses: string[] = [],
  ) {
    const where = statuses.length
      ? `doc->>'$.status' IN ('${statuses.join("', '")}')`
      : ""
    const [record] = await this.find({ condition, where })
    return record
  }
}
