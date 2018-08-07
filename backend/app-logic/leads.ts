import { Lead, LeadQueryOptions } from "../models/leads/types"

import { IModels } from "./index"
import { Notification } from "../models/notifications/types"

import * as _ from "lodash"

export interface getLeadsOptions {
  sort_by?: [string, "ASC" | "DESC"]
  filters?: [string, string][]
  page?: number
  limit?: number
}

const validate_lead = (lead: Lead) => {
  //TODO: validate lead
  const errors = []
  if (!lead.description || lead.description.length < 2)
    errors.push("description::too short")
  return errors
}

const summy = prop => (sum, obj) => (sum += obj[prop])

export default class Leads {
  constructor(private models: IModels) {}
  public UploadCSV() {}

  public async moveMyLeadsToSellLeads(leads: number[]) {
    return await this.models.leads.moveMyToSell(leads)
  }

  public async buyLeads(leads: number[], new_owner: number) {
    const deal_price = await this.models.leads.getDealPrice(leads)
    const buyer = await this.models.users.mustGetUserById(new_owner)
    buyer.balance = buyer.balance | 0
    console.log({ deal_price, buyer })
    if (buyer.balance < deal_price) {
      throw new Error("balance::amount insufficient")
    }
    const result = await this.models.leads.buy(leads, new_owner)
    const groupedByOwner = _.groupBy(result, "bought_from")
    let overall_cost = 0
    for (let key in groupedByOwner) {
      const user_id = parseInt(key)
      const group: Lead[] = groupedByOwner[key]
      const transaction_amount = group.reduce(summy("price"), 0)
      overall_cost += transaction_amount
      this.models.users.increaseBalance(user_id, overall_cost)
      this.models.users.decreaseBalance(new_owner, overall_cost)
      this.models.notifications.createNotification({
        msg: `${
          group.length
        } of your leads were bought for a total of ${overall_cost}$`,
        userId: user_id,
        unread: true,
      })
    }
    return result
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
