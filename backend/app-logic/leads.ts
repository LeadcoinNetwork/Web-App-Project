import { Lead } from "models/leads/types"

import { IModels } from "./index"

export default class Leads {
  constructor(private models: IModels) {}
  public UploadCSV() {}
  public async AddLead(lead: Lead) {
    return await this.models.leads.insert(lead)
  }
}
