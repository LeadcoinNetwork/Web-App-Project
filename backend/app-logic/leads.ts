import { Lead, LeadQueryOptions } from "../models/leads/types"

import { IModels } from "./index"

export interface getLeadsOptions {
  sort_by?: [string, "ASC" | "DESC"]
  filters?: [string, string][]
  page?: number
  limit?: number
}

const validate_lead = (lead: Lead) => {
  //TODO: validate lead
  const errors = []
  if (!lead.email || lead.email.length < 2)
    errors.push("email::email not valid")
  return errors
}

export default class Leads {
  constructor(private models: IModels) {}
  public UploadCSV() {}

  public async moveMyLeadsToSellLeads(leads: number[]) {
    return await this.models.leads.moveMyToSell(leads)
  }

  public async buyLeads(leads: number[], new_owner: number) {
    return await this.models.leads.buy(leads, new_owner)
  }

  public async removeLead(lead_id: number) {
    return await this.models.leads.remove(lead_id)
  }

  public async AddLead(lead: Lead) {
    const problems = validate_lead(lead)
    if (problems.length == 0) {
      const id = await this.models.leads.AddLead(lead)
      return id
    }
    throw new Error(problems.join("; "))
  }

  public async getSellLeads(user_id: number, options: LeadQueryOptions) {
    return await this.models.leads.getMyLeadsForSale(user_id, options)
  }

  public async getSoldLeads(user_id: number, options: LeadQueryOptions) {
    return await this.models.leads.getSoldLeads(user_id, options)
  }

  public async getMyLeads(user_id: number, options: LeadQueryOptions) {
    return await this.models.leads.getMyLeads(user_id, options)
  }

  public async getBoughtLeads(user_id: number, options: LeadQueryOptions) {
    return await this.models.leads.getBoughtLeads(user_id, options)
  }

  public async getAllLeads(options: LeadQueryOptions) {
    return await this.models.leads.buyLeadsGetAll(options)
  }
}
