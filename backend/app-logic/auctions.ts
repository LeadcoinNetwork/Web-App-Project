import { AuctionQueryOptions, AuctionStatuses } from "../models/auctions/types"
import { Lead } from "../models/leads/types"
import { LeadHistory } from "@/models/leads-history/types"
import { IModels } from "./index"

export default class Auctions {
  constructor(private models: IModels) {}

  public async addAuction({ leadId, endDate, userId }) {
    const maxTimeAuction = 2592000000000 // 30 days
    const startDate = new Date().getTime()
    if (endDate < startDate && +startDate + maxTimeAuction < endDate)
      new Error("wrong params")
    const lead: Lead = await this.models.leads.getSingleLead(leadId)
    if (lead.ownerId != userId)
      throw new Error("this user does not have a right for this lead")
    const isAuctionPresent = !!(await this.getAuction({ leadId }, [
      "active",
      "ransom",
    ]))
    if (isAuctionPresent) throw new Error("auction is present")
    const startPrice = lead.lead_price
    const creatorId = userId
    const result = await this.models.auctions.addAuction({
      leadId,
      endDate,
      startDate,
      startPrice,
      creatorId,
      isClosed: false,
    })

    await this.models.leads.moveMyToSell([leadId])

    const newLeadHistory: LeadHistory = {
      leadId: leadId,
      date: new Date().getTime(),
      event: "auctionCreate",
      ownerId: lead.ownerId,
      description: { startDate, endDate, startPrice },
    }
    await this.models.leadsHistory.addLeadHistory(newLeadHistory)
    return await this.getAuction({ id: result.insertId })
  }

  public async getAuction(condition, statuses?) {
    return await this.models.auctions.getAuction(condition, statuses)
  }

  public async getAuctionsAndLead(options: AuctionQueryOptions) {
    const auctions = await this.models.auctions.auctionsQueries.auctionsAndLeadGetAll(
      options,
    )
    auctions.list = this.addStatusToAuctions(auctions.list)
    return auctions
  }

  public addIsFavoriteTotAuctionsAndLead(auctions, favorites: number[]) {
    if (favorites.length === 0) return auctions
    return auctions.map(auction => {
      auction.lead.favorite =
        favorites.indexOf(auction.lead.id) === -1 ? false : true
      return auction
    })
  }

  public async completeAuctions() {
    const auctions = await this.models.auctions.auctionsQueries.getCompletedAuctions()
    const auctionIds = auctions.map(auction => auction.id)
    const leadIds = auctions.map(auction => auction.leadId)
    await this.models.auctions.completeAuctionsByIds(auctionIds)
    await this.models.leads.completeBidding(leadIds)
    for (const auction of auctions) {
      const newLeadHistory: LeadHistory = {
        leadId: auction.leadId,
        date: new Date().getTime(),
        event: "auctionRevert",
        ownerId: auction.creatorId,
        description: { auctionId: auction.id },
      }
      await this.models.leadsHistory.addLeadHistory(newLeadHistory)
    }
    return true
  }

  private addStatusToAuctions(auctions) {
    return auctions.map(auction => {
      auction.status = this.getStatus(auction)
      return auction
    })
  }

  private getStatus(auction) {
    const now = new Date().getTime()
    const ransomPeriodDuration = 172800000000 //2 days
    if (auction.isClosed) return "past"
    if (auction.endDate > now) return "active"
    if (auction.endDate > now - ransomPeriodDuration) return "ransom"
  }
}
