export type HistoryEvent = "created" | "updated" | "purchased" | "forSale"

export interface LeadHistory {
  leadId: number
  date: number
  ownerId: number
  event: HistoryEvent
  description?: any
}

export interface LeadHistoryQueryOptions {
  leadId?: number
}
