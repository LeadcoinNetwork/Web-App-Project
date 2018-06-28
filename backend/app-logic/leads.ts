import AppLogic from "./index"
import {Lead} from 'models/leads/types'

export default class Leads {
  constructor(private appLogic: AppLogic) {}
  public UploadCSV() {}
  public async AddLead(lead: Lead) {
    return await this.appLogic.models.leads.insert(lead)
  }
}
