import { AuctionQueryOptions, AuctionStatuses } from "../models/auctions/types"
import { Lead } from "../models/leads/types"
import { LeadHistory } from "@/models/leads-history/types"
import { IModels } from "./index"

export default class Auctions {
  constructor(private models: IModels) {}

  public async addAuction({ leadId, endDate, userId }) {
    let maxTimeAuction = 2592000000000 // 30 days
    let startDate = new Date().getTime()
    if (endDate < startDate && +startDate + maxTimeAuction < endDate)
      new Error("wrong params")
    let lead: Lead = await this.models.leads.getSingleLead(leadId)
    if (lead.ownerId != userId)
      throw new Error("this user does not have a right for this lead")
    let isAuctionPresent = !!(await this.getAuction({ leadId }, [
      "active",
      "ransom",
    ]))
    if (isAuctionPresent) throw new Error("auction is present")
    let startPrice = lead.lead_price
    let status: AuctionStatuses = "active"
    let creatorId = userId
    let result = await this.models.auctions.addAuction({
      leadId,
      endDate,
      startDate,
      startPrice,
      creatorId,
      status,
    })

    const newLeadHistory: LeadHistory = {
      leadId: leadId,
      date: new Date().getTime(),
      event: "auctionCreate",
      ownerId: lead.ownerId,
      description: { status, startDate, endDate, startPrice },
    }
    await this.models.leadsHistory.addLeadHistory(newLeadHistory)
    return await this.getAuction({ id: result.insertId })
  }

  public async getAuction(condition, statuses?) {
    return await this.models.auctions.getAuction(condition, statuses)
  }

  public async getAuctionsAndLead(options: AuctionQueryOptions) {
    return await this.models.auctions.auctionsQueries.auctionsAndLeadGetAll(
      options,
    )
  }

  public addIsFavoriteTotAuctionsAndLead(auctions, favorites: number[]) {
    if (favorites.length === 0) return auctions
    return auctions.map(auction => {
      auction.lead.favorite =
        favorites.indexOf(auctions.lead.id) === -1 ? false : true
      return auction
    })
  }

  public async addBet({ auctionId, price, userId }) {
    const auction = await this.getAuction({ id: auctionId }, ["active"])
    if (!auction) throw new Error("no auction found")
    if (auction.creatorId == userId) throw new Error("an owner can`t bet")
    const maxPrice = await this.models.bets.betsQueries.getMaxBetsPrice(
      auctionId,
    )
    if (maxPrice >= +price) throw new Error("low price")
    let result = await this.models.bets.addBet({
      auctionId,
      price,
      userId,
      date: new Date().getTime(),
    })
    return await this.models.bets.getBet({ id: result.insertId })
  }
}
