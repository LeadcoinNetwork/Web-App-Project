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

  public async getLeadHistory(
    condition: LeadHistoryQueryOptions,
    isLeadOwner: boolean = false,
  ) {
    let histories: LeadHistory[] = await this.find({ condition })
    if (!isLeadOwner) histories = this.hideContactInformation(histories)
    return histories
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

  public hideContactInformation(histories: LeadHistory[]) {
    return histories.map(history => {
      if (
        history.description &&
        history.description.changed &&
        history.description.changed.length > 0
      )
        history.description.changed.map(change => {
          switch (change.key) {
            case "contact_person":
              change.oldValue = "**********"
              change.newValue = "**********"
            case "email":
              change.oldValue = "*********@gmail.com"
              change.newValue = "*********@gmail.com"
            case "telephone":
              change.oldValue = change.oldValue.substring(0, 6) + "******"
              change.newValue = change.newValue.substring(0, 6) + "******"
          }
          return change
        })
      return history
    })
  }
}
