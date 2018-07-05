import { SuperAgentStatic } from "superagent"
import { methods, request } from "./request"
import { Lead } from "../../../backend/models/leads/types"

interface LeadsApiOptions {
  sort_by?: [string, 'ASC' | 'DESC']
  filters?: [string, string][]
}

export default class LeadsApi {
  constructor(private request: request) {}

  async add(lead: Lead) {
    return await this.request(methods.post, "/leads/add", { lead })
  }

  async getBoughtLeads(options: LeadsApiOptions) {
    return await this.request(methods.get, "/leads/bought", {...options})
  }

  async getSoldLeads(options: LeadsApiOptions) {
    return await this.request(methods.get, "/leads/sold", {...options})
  }

  async getMyLeads(options: LeadsApiOptions) {
    return await this.request(methods.get, "/leads/my", {...options})
  }
}