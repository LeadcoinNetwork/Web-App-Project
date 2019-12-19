import { Industry } from "@/models/leads/types"

export type AuctionStatuses = "ransom" | "past" | "active"

export interface Auction {
  leadId: number
  creatorId: number
  startDate: number
  endDate: number
  startPrice: number
  isPast: boolean
}

export interface AuctionQueryOptions {
  leadId?: number
  creatorId?: number
  startDate?: number
  endDate?: number
  startPrice?: number
  isPast?: boolean
  id?: number
  industry?: Industry
  sort?: any
  sort_by?: any
  page?: number
  limit?: any
  filters?: object
  userId?
}
