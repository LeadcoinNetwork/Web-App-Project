import { AuctionQueryOptions, AuctionStatuses } from "../models/auctions/types"
import { Review, ReviewQueryOptions } from "../models/reviews/types"
import { IModels } from "./index"

export default class Reviews {
  constructor(private models: IModels) {}

  public async addReview({ fromUserId, rating, comment, leadId }) {
    if (!fromUserId || !leadId || (!rating && rating != 0))
      throw new Error("wrong params")
    if (comment && comment.length > 1000) throw new Error("comment too long")
    const lead = await this.models.leads.getById(leadId)
    if (lead.ownerId != fromUserId || !lead.bought_from || lead.isReview)
      throw new Error("wrong params")
    const toUserId = lead.bought_from
    rating = this.normalizeRating(rating)
    const result = await this.models.reviews.addReviews({
      toUserId,
      fromUserId,
      rating,
      comment,
      date: new Date().getTime(),
    })
    await this.models.leads.reviewLeft(leadId)
    await this.calculateRating(toUserId)
    return await this.models.reviews.getReview({ id: result.insertId })
  }

  public async calculateRating(userId) {
    const reviews: any[] = await this.models.reviews.getRatings(userId)
    const numberReviews = reviews.length
    let rating = numberReviews
      ? reviews.reduce((a, review) => a + +review.rating, 0) / numberReviews
      : 0
    rating = this.normalizeRating(rating)
    return await this.models.users.updateUser(userId, { numberReviews, rating })
  }

  public async getReviews(toUserId, limit, sort) {
    return await this.models.reviews.getReviews(toUserId, limit, sort)
  }

  private normalizeRating(rating) {
    rating = parseFloat(rating.toFixed(2))
    rating = Math.max(0, rating)
    rating = Math.min(5, rating)
    return rating
  }

  public async getAllReviews(condition, sort, limit) {
    let [bets, count] = await this.models.reviews.getAllReviews(
      condition,
      sort,
      limit,
    )
    return [bets, count]
  }
}
