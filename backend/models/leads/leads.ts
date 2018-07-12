import SQL from "../mysql-pool/mysql-pool"

import { Lead, LeadQueryOptions, NewLead } from "./types"

import baseDBModel from "../base-db-model"

export default class Leads extends baseDBModel<
  NewLead,
  Lead,
  LeadQueryOptions
> {
  constructor(sql: SQL) {
    super(sql, "leads")
  }

  public async AddLead(lead: Lead) {
    return await this.insert(lead)
  }

  public async insertLead(new_lead) {
    return this.insert(new_lead)
  }

  public async findLeads({
    condition,
    sort,
    limit,
  }: {
    condition?: LeadQueryOptions
    sort?: { sortBy: string; sortOrder: "ASC" | "DESC" }
    limit?: { start: number; offset: number }
  }): Promise<Lead[]> {
    return this.find({ condition, sort, limit })
  }

  public async findAndSort() {}

  public async getSoldLeads(user_id: number, options: LeadQueryOptions) {
    const { filters } = options
    let where_additions
    if (filters) {
      where_additions = filters
        .map(f => {
          return f[0] + ' LIKE "%' + escape(f[1]) + '%"'
        })
        .join(" AND ")
    }
    let query = `
      SELECT *
      FROM leads
      WHERE bought_from = ${user_id}
      AND active = 1
    `
    if (where_additions.length > 0) {
      query += `AND ${where_additions};`
      return await this.query(query)
    }
  }

  public async getMyLeads(user_id: number, options: LeadQueryOptions) {
    const { filters } = options
    let where_additions
    if (filters) {
      where_additions = filters
        .map(f => {
          return f[0] + ' LIKE "%' + escape(f[1]) + '%"'
        })
        .join(" AND ")
    }
    let query = `
      SELECT *
      FROM leads
      WHERE owner_id = ${user_id}
      AND active = 1
    `
    if (where_additions.length > 0) {
      query += `AND ${where_additions};`
      return await this.query(query)
    }
  }

  public async getBoughtLeads(user_id: number, options: LeadQueryOptions) {
    const { filters } = options
    let where_additions
    if (filters) {
      where_additions = filters
        .map(f => {
          return f[0] + ' LIKE "%' + escape(f[1]) + '%"'
        })
        .join(" AND ")
    }
    let query = `
      SELECT *
      FROM leads
      WHERE owner_id = ${user_id}
      AND active = 1
      AND bought_from > 0
    `
    if (where_additions.length > 0) {
      query += `AND ${where_additions};`
    }
    return await this.query(query)
  }

  public async getLeadsNotOwnedByMe(
    user_id: number,
    options: LeadQueryOptions,
  ) {
    const { filters } = options
    let where_additions
    if (filters) {
      where_additions = filters
        .map(f => {
          return f[0] + ' LIKE "%' + escape(f[1]) + '%"'
        })
        .join(" AND ")
    }
    let query = `
      SELECT *
      FROM leads
      WHERE owner_id <> ${user_id}
      AND active = 1
    `
    if (where_additions.length > 0) {
      query += `AND ${where_additions};`
    }
    return await this.query(query)
  }

  async addWithNewOwner(lead_id: number, new_owner: number) {
    const lead = await this.getById(lead_id)
    lead.bought_from = lead.owner_id
    lead.bought_currency = lead.currency
    lead.owner_id = new_owner
    const _id = await this.insert(lead)
    return _id
  }

  async buy(leads: number[], new_owner: number) {
    // try to make leads inactive, in case of race condition
    const inactive_leads = await leads.filter(async l_id => {
      return await this.update(l_id, { active: false })
    })

    // insert the leads as new after a change ownership
    return inactive_leads.map(async (l_id: number) => {
      return await this.addWithNewOwner(l_id, new_owner)
    })
  }

  async getById(id: number): Promise<Lead> {
    const condition = { id }
    const [record] = await this.find({ condition })
    return record
  }

  async remove(id: number) {
    let status = await this.sql.query("DELETE FROM leads WHERE id = ?", id)
    return status.affectedRows != 0
  }
}
