import { IModels } from "./index"
import { TransactionsQueryOptions } from "@/models/transactions/types"

export default class Transactions {
  constructor(private models: IModels) {}

  public async getTransactionsByUserId(userId: number, limit) {
    const condition: TransactionsQueryOptions = { userId }
    return await this.models.transactions.getTransactions(condition, limit)
  }

  public async getAllTransactions(condition, sort, limit) {
    let [bets, count] = await this.models.transactions.getAllTransactions(
      condition,
      sort,
      limit,
    )
    return [bets, count]
  }
}
