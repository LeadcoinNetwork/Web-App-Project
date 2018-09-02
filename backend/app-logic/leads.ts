import { Lead, LeadQueryOptions, NewBaseLead } from "../models/leads/types"

import { IModels } from "./index"
import { Notification } from "../models/notifications/types"

import * as _ from "lodash"
import config from "./config"
var request = require("request-promise")

const logTransaction = async ({ fiat_amount, exchange_rate, leads_count }) => {
  const res = await request({
    uri: "http://blockchain.leadcoin.network/exchange",
    method: "POST",
    json: true,
    body: {
      fiat_amount,
      exchange_rate,
      leads_count,
    },
  })
  return res
  //{ txid: '0x9d6cd285dd8ac7bde247da8943ca2b536f58d7cac79deac975ba48766901eb68',
  //  link: 'http://ropsten.etherscan.io/tx/0x9d6cd285dd8ac7bde247da8943ca2b536f58d7cac79deac975ba48766901eb68' }
}

export interface getLeadsOptions {
  sort_by?: [string, "ASC" | "DESC"]
  filters?: [string, string][]
  page?: number
  limit?: number
}

const contains_contact = lead => {
  return lead.telephone || lead.name || lead.email || lead["Contact Person"]
}

const validate_lead = lead => {
  const errors = []
  if (!lead.lead_price) errors.push("lead_price::Lead price is required.")
  if (!contains_contact(lead)) {
    errors.push("phone::At least one contact info is required.")
    errors.push("name::")
    errors.push("email::")
  }
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
    let buyer
    if (new_owner > 0) {
      buyer = await this.models.users.mustGetUserById(new_owner)
    } else {
      buyer = {
        balance: 999999999,
      }
    }
    buyer.balance = buyer.balance | 0
    if (buyer.balance < deal_price) {
      throw new Error("balance::Amount insufficient.")
    }
    const result = await this.models.leads.buy(leads, new_owner)
    const groupedByOwner = _.groupBy(result, "bought_from")
    let overall_cost = 0
    for (let key in groupedByOwner) {
      const seller = parseInt(key)
      const group: Lead[] = groupedByOwner[key]
      const transaction_amount = group.reduce(summy("lead_price"), 0)
      overall_cost += transaction_amount
      this.models.users.increaseBalance(seller, transaction_amount)
      this.models.notifications.createNotification({
        msg: `Someone bought ${
          group.length
        } of your leads for a total of ${overall_cost}$.`,
        userId: seller,
        unread: true,
      })
    }
    this.models.users.decreaseBalance(new_owner, overall_cost)
    const txDetails = await logTransaction({
      leads_count: result.length.toString(),
      fiat_amount: (overall_cost * 100).toString(),
      exchange_rate: "1999000000000000000",
    })
    /*
    I'll just comment this part out instead of deleting it, maybe they'll want it back someday (@Leekao)

    this.models.notifications.createNotification({
      msg: "Your transaction was logged to " + txDetails.link,
      userId: new_owner,
      unread: true,
    })
    */
    return txDetails
  }

  public async removeLead(lead_id: number) {
    return await this.models.leads.remove(lead_id)
  }

  public async sanitizeLead(lead) {
    if (lead.lead_price && lead.lead_price.replace)
      lead.lead_price = Number(lead.lead_price.replace(/[^0-9\.-]+/g, ""))
    if (lead.price && lead.price.replace)
      lead.price = Number(lead.price.replace(/[^0-9\.-]+/g, ""))
    return lead
  }

  public async AddLead(lead: Lead) {
    const problems = validate_lead(lead)
    if (problems.length == 0) {
      lead = await this.sanitizeLead(lead)
      const id = await this.models.leads.AddLead(lead)
      return id
    }
    throw new Error(problems.join(" ;"))
  }

  public async getMockLeads(user_id: number) {
    return await this.models.leads.getMockLeads(user_id)
  }

  public async getSellLeads(user_id: number, options: LeadQueryOptions) {
    return await this.models.leads.getMyLeadsForSale(user_id, options)
  }

  public async getSoldLeads(user_id: number, options: LeadQueryOptions) {
    return await this.models.leads.getSoldLeads(user_id, options)
  }

  public async getMyLeads(user_id: number, options: LeadQueryOptions) {
    const leads = await this.models.leads.getMyLeads(user_id, options)
    return leads
  }

  public async getBoughtLeads(user_id: number, options: LeadQueryOptions) {
    const leads = await this.models.leads.getBoughtLeads(user_id, options)
    leads.list = leads.list.map(l => {
      return Object.assign(l, { lead_price: null })
    })
    return leads
  }

  public async getAllLeads(options: LeadQueryOptions) {
    return await this.models.leads.buyLeadsGetAll(options)
  }
}
