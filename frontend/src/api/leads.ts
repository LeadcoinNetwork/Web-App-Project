import { methods, request } from "./request"
import { Lead, NewLead } from "../../../backend/models/leads/types"

interface LeadsApiOptions {
  sort_by?: [string, "ASC" | "DESC"]
  filters?: [string, string][]
}

export default class LeadsApi {
  constructor(private request: request) {}

  async sellLeadsAddByForm(lead: NewLead) {
    return await this.request(methods.post, "/sell-leads/addbyform", { lead })
  }
  async buyLeadsGetList(filters?) {
    return await this.request(methods.get, "/buy-leads", null, { ...filters })
  }

  async getBoughtLeads(options: LeadsApiOptions) {
    return await this.request(methods.get, "/leads/bought", { ...options })
  }

  async getSoldLeads(options: LeadsApiOptions) {
    return await this.request(methods.get, "/leads/sold", { ...options })
  }

  async getMyLeads(options: LeadsApiOptions) {
    return await this.request(methods.get, "/leads/my", { ...options })
  }
}
