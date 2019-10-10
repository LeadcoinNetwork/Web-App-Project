import { LeadHistoryQueryOptions } from "../models/leads-history/types"

import { IModels } from "./index"

export default class LeadsHistory {
  constructor(private models: IModels) {}

  public async getLeadHistory(options: LeadHistoryQueryOptions) {
    return await this.models.leadsHistory.getLeadHistory(options)
  }
}
