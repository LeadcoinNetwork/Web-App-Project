import { Bet, BetQueryOptions } from "../models/bets/types"

import { IModels } from "./index"

export default class Bets {
  constructor(private models: IModels) {}

  public async addBet({ auctionId, price, userId }) {
    auctionId = +auctionId
    if (!auctionId && !price) throw new Error("wrong params")
    price = parseInt(price)
    const auction = await this.models.auctions.getAuction({ id: auctionId }, [
      "active",
    ])
    if (!auction) throw new Error("no auction found")
    if (auction.creatorId == userId) throw new Error("an owner can`t bet")
    const maxPrice = await this.models.bets.betsQueries.getMaxBetsPrice(
      auctionId,
    )
    if (maxPrice >= price) throw new Error("low price")
    const result = await this.models.bets.addBet({
      auctionId,
      price,
      userId,
      date: new Date().getTime(),
    })
    return await this.models.bets.getBet({ id: result.insertId })
  }

  public async getAllBets(condition, sort, limit) {
    let [bets, count] = await this.models.bets.getAllBets(
      condition,
      sort,
      limit,
    )
    return [bets, count]
  }
}
