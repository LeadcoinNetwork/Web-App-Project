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

  public async getReviews(toUserId, limit, sort) {
    return await this.find({ condition: { toUserId }, limit, sort })
  }

  public async getRatings(userId: number) {
    return await this.reviewsQueries.getRatings(userId)
  }
}
