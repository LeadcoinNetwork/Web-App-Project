import AppLogic from "./index"
import { Lead } from "models/leads/types"

import { IModels } from "./index"

export default class Leads {
  constructor(private models: IModels) {}
  public UploadCSV() {}
  public AddLead(lead: Lead) {
    console.log(lead)
    this.models.config
    return
    // models.leads.insert(lead)
  }
}
