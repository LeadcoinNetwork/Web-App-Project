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
    const where = this.getCndByStatuses(statuses)
    const [record] = await this.find({ condition, where })
    return record
  }

  public async completeAuctionsByIds(auctionIds: number[]) {
    return auctionIds.map(auctionId =>
      this.update(auctionId, { isClosed: true }),
    )
  }

  public async completeAuctionsByLeadIds(leadIds = []) {
    if (!leadIds.length) return []
    const now = new Date().getTime()
    const where = `doc->>'$.leadId' IN ('${leadIds.join(
      "' ,'",
    )}') AND doc->>'$.endDate' < ${now}`
    const select = "id"
    const auctions = await this.find({ where, select })
    const auctionIds = auctions.map(a => a.id)
    return await this.completeAuctionsByIds(auctionIds)
  }

  public async getAllAuctions(condition, sort, limit) {
    const records = await this.find({ condition, sort, limit })
    const count = await this.count({ condition })
    return [records, count]
  }
}
