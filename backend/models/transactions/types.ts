export interface BaseTransaction {
  id?: number
  userId
  from: string
  to: string
  value: string
  txHash: string
  date: number
}

export interface TransactionsQueryOptions {
  userId: number
}

export type Transaction = BaseTransaction
