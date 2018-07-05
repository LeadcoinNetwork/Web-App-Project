import { Lead } from "../models/leads/types"

import { IModels } from "./index"

export interface getLeadsOptions {
  sort_by?: [string, "ASC" | "DESC"]
  filters?: [string, string][]
  page?: number
  limit?: number
}

const validate_lead = (lead:Lead) => {
  //TODO: smthing
  const errors = []
  if (!lead.email || lead.email.length < 2)
    errors.push("email not valid")
  return (errors)
}

export default class Leads {
  constructor(private models: IModels) {}
  public UploadCSV() {}

  public async removeLead(lead_id: number) {
    return await this.models.leads.remove(lead_id)
  }
  public async AddLead(lead: Lead) {
    const problems = validate_lead(lead)
    if (problems.length == 0) {
      const [success, id]  =  await this.models.leads.insert(lead)
      return [success, id]
    }
    throw new Error(problems.join('; '))
  }

  public async getSoldLeads(user_id:number, options: getLeadsOptions) {
    const {filters} = options
    let where_additions = []
    if (filters) {
      where_additions = filters.map((f) => {
        return f[0] +" LIKE \"%"+ f[1] +"%\""
      })
    }
    return await this.models.leads.find({
      bought_from: user_id,
      active: 1
    }, {
      sort_by: options.sort_by,
      where_additions
    })
  }

  public async getMyLeads(user_id:number, options: getLeadsOptions) {
    const {filters, limit, page} = options
    let where_additions = []
    if (filters) {
      where_additions = filters.map((f) => {
        return f[0] +" LIKE \"%"+ f[1] +"%\""
      })
    }
    return await this.models.leads.find({
      owner_id: user_id,
      active: 1
    }, {
      page, limit,
      sort_by: options.sort_by,
      where_additions
    })
  }

  public async getBoughtLeads(user_id:number, options: getLeadsOptions) {
    const {filters} = options
    let where_additions = []
    if (filters) {
      where_additions = filters.map((f) => {
        return f[0] +" LIKE \"%"+ f[1] +"%\""
      })
    }
    return await this.models.leads.find({
      owner_id: user_id,
      active: 1
    }, {
      sort_by: options.sort_by,
      where_additions: ["bought_from > 0"].concat(where_additions)
    })
  }

  public async getLeadsNotOwnedByMe(user_id:number, options: getLeadsOptions) {
    return await this.models.leads.find({
      active: 1
    }, {
      sort_by: options.sort_by,
      where_additions: [
        "owner_id <> "+user_id
      ]
    })
  }
}
