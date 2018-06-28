import { Lead } from "models/leads/types"

import { IModels } from "./index"

export default class Leads {
  constructor(private models: IModels) {}
  public UploadCSV() {}
  public async removeLead(lead_id: number) {
    return await this.models.leads.remove(lead_id)
  }
  public async AddLead(lead: Lead) {
    return await this.models.leads.insert(lead)
  }
  public async getBoughtLeads(user_id:number, options: {sort_by: string[]}) {
    return await this.models.leads.find({
      owner: user_id
    })
  }
}
