import { SuperAgentStatic } from "superagent"
import { methods, request } from "./request"
import {Lead} from '../../../backend/models/leads/types'

export default class LeadsApi {
  constructor(private request: request) {}
  async add(lead: Lead) {
    console.log({lead})
    return await this.request(methods.post, "/leads/add", {lead})
  }
}