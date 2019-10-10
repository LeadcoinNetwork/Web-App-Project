import SQL from "../mysql-pool/mysql-pool"
import * as _ from "lodash"

import { LeadHistory, LeadHistoryQueryOptions } from "./types"

import baseDBModel from "../base-db-model/base-db-model"
import { Lead } from "../leads/types"

const ForHistory = [
  "contact_person",
  "email",
  "telephone",
  "page",
  "content_updates",
  "functionality",
  "mobile_design",
  "seo",
  "content_management",
  "e_commerce",
  "blog",
  "budget",
  "languages",
  "hosting",
  "comments",
  "price",
  "lead_price",
  "industry",
]

export default class LeadsHistory extends baseDBModel<
  LeadHistory,
  LeadHistory,
  LeadHistoryQueryOptions
> {
  constructor(sql: SQL) {
    super(sql, "leads_history")
  }

  public async getLeadHistory(condition: LeadHistoryQueryOptions) {
    return await this.find({ condition })
  }

  public async addLeadHistory(leadHistory: LeadHistory) {
    return await this.insert(leadHistory)
  }

  public wasChanged(leadToChange: Lead, leadAfterChange: Lead) {
    let changed = []
    ForHistory.forEach(key => {
      const oldValue = leadToChange[key]
      const newValue = leadAfterChange[key]
      if (Array.isArray(oldValue) && Array.isArray(newValue)) {
        if (!_.isEqual(oldValue.sort(), newValue.sort())) {
          changed.push({ key, oldValue, newValue })
        }
      } else if (oldValue !== newValue) {
        changed.push({ key, oldValue, newValue })
      }
    })
    return changed
  }
}
