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
    const now = new Date().getTime()
    const ransomPeriodDuration = 172800000000 //2 days
    let whereCondition = []
    if (statuses.indexOf("active"))
      whereCondition.push(
        `doc->>'$.endDate' > ${now} AND doc->>'$.isPast' <> false`,
      )
    if (statuses.indexOf("ransom"))
      whereCondition.push(
        `(doc->>'$.endDate' > ${now -
          ransomPeriodDuration}) AND doc->>'$.isPast' <> false`,
      )
    if (statuses.indexOf("past")) whereCondition.push(`doc->>'$.isPast' = true`)
    const where = whereCondition.join(" OR")
    const [record] = await this.find({ condition, where })
    return record
  }

  public async compliteAuctions(leadsId: number[]) {
    return leadsId.map(leadId => this.update(leadId, { isPast: true }))
  }
}
