import { LeadHistoryQueryOptions } from "../models/leads-history/types"
import { Lead } from "../models/leads/types"

import { IModels } from "./index"

export default class LeadsHistory {
  constructor(private models: IModels) {}

  public async getLeadHistory(leadId, userId, limit) {
    const options: LeadHistoryQueryOptions = { leadId }
    const lead: Lead = await this.models.leads.getById(leadId, true)
    const isLeadOwner = userId === lead.ownerId
    return await this.models.leadsHistory.getLeadHistory(
      options,
      isLeadOwner,
      limit,
    )
  }
}
