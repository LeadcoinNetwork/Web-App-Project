import AppLogic from "./index"
import {Lead} from 'models/leads/types'

export default class Leads {
  constructor(private appLogic: AppLogic) {}
  public UploadCSV() {}
  public AddLead(lead: Lead) {
    console.log(lead)
    return
    this.appLogic.models.leads.insert(lead)
  }
}
