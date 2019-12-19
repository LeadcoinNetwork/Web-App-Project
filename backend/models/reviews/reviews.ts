import SQL from "../mysql-pool/mysql-pool"

import { Review, ReviewQueryOptions } from "./types"
import baseDBModel from "../base-db-model/base-db-model"

export default class Reviews extends baseDBModel<
  Review,
  Review,
  ReviewQueryOptions
> {
  constructor(sql: SQL) {
    super(sql, "reviews")
  }

  public async addReviews(review: Review) {
    return await this.insert(review)
  }

  public async getReview(condition: ReviewQueryOptions) {
    const [record] = await this.find({ condition })
    return record
  }

  public async getReviews(toUserId, limit) {
    return await this.find({ condition: { toUserId }, limit })
  }

  public async getRatings(userId: number) {
    return await this.reviewsQueries.getRatings(userId)
  }

  // public async getAuction(
  //   condition: AuctionQueryOptions,
  //   statuses: string[] = [],
  // ) {
  //   let where = statuses.length
  //     ? `doc->>'$.status' IN ('${statuses.join("', '")}')`
  //     : ""
  //   const [record] = await this.find({ condition, where })
  //   return record
  // }
}
