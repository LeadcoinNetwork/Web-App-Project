import SQL from "../mysql-pool/mysql-pool"

import { Lead, LeadQueryOptions, BaseLead } from "./types"

import baseDBModel from "../base-db-model/base-db-model"
// import NotFound from "../../utils/not-found"
import * as Chance from "chance"
const chance = Chance()

export default class Leads extends baseDBModel<
  BaseLead,
  Lead,
  LeadQueryOptions
> {
  constructor(sql: SQL) {
    super(sql, "leads")
  }

  public static getMockLead(owner: number = 0): Lead {
    //@ts-ignore
    return {
      industry: "Website building",
      email: "moshe@moshe.com", //chance.email(),
      pages: chance.integer({ min: 1, max: 30 }),
      content_updates: chance.pickone(["Mostly Static", "Dynamic"]),
      date: new Date().valueOf(),
      functionality: chance.pickset(
        [
          "Personal",
          "Corporate",
          "Educational",
          "Portfolio",
          "Restaurant",
          "Small Business",
          "Other",
        ],
        chance.integer({ min: 1, max: 5 }),
      ),
      mobile_design: chance.pickone(["Yes", "No"]),
      seo: chance.pickone(["Yes", "No"]),
      content_management: chance.pickone(["Yes", "No"]),
      e_commerce: chance.pickone(["Yes", "No"]),
      blog: chance.pickone(["Yes", "No"]),
      budget: chance.integer({ min: 1, max: 128 }),
      languages: chance.pickset(
        ["Hebrew", "Irish", "Italian", "Korean", "Latin", "Polish", "Russian"],
        chance.integer({ min: 1, max: 5 }),
      ),
      hosting: chance.pickone(["Yes", "No"]),
      comments: chance.sentence({
        words: chance.integer({ min: 1, max: 9 }),
      }),
      bought_from: null,
      forSale: true,
      lead_price: chance.integer({ min: 1, max: 20 }),
      ownerId: owner,
      contact_person: chance.name(),
      telephone: chance.phone(),
      active: true,
      price: parseInt(
        chance
          .integer()
          .toString()
          .substring(0, 7)
          .slice(1, -1),
      ),
    }
  }

  public async AddLead(lead: Lead) {
    return await this.insert(lead)
  }

  public async EditLead(lead: Lead) {
    return await this.update(lead.id, lead)
  }

  public async insertLead(new_lead: Lead) {
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

  public async getOwnedLeads() {
    return await this.leadsQueries.getOwnedLeads()
  }
  public async getOwners() {
    return await this.leadsQueries.getOwners()
  }

  public async getSoldLeads(user_id: number, options: LeadQueryOptions) {
    return await this.leadsQueries.getSoldLeads(user_id, options)
  }

  public async getLeadFields(lead_type: string) {
    return await this.leadsQueries.getLeadFields(lead_type)
  }

  public async getMockLeads(user_id: number) {
    return await this.leadsQueries.getMockLeads(user_id)
  }

  public async getMyLeadsForSale(user_id: number, options: LeadQueryOptions) {
    return await this.leadsQueries.getMyLeadsForSale(user_id, options)
  }

  public async getMyLeads(user_id: number, options: LeadQueryOptions) {
    return await this.leadsQueries.getMyLeads(user_id, options)
  }

  public async getSingleLead(lead_id: number) {
    return await this.getById(lead_id)
  }

  public async getDealPrice(lead_ids: number[]) {
    return await this.leadsQueries.getDealPrice(lead_ids)
  }

  public async getBoughtLeads(user_id: number, options: LeadQueryOptions) {
    return await this.leadsQueries.getBoughtLeads(user_id, options)
  }

  public async buyLeadsGetAll(options: LeadQueryOptions) {
    return await this.leadsQueries.buyLeadsGetAll(options)
  }

  async moveMyToSell(lead_ids: number[]) {
    const lead_promises = lead_ids.map(async (l_id: number) => {
      await this.update(l_id, { forSale: "true" })
    })
    return Promise.all(lead_promises)
  }

  async buy(lead_ids: number[], new_owner: number) {
    const lead_promises = lead_ids
      .filter(async (l_id: number) => {
        await this.update(l_id, { active: "false" })
      })
      .map(async (l_id: number) => {
        const lead: Lead = await this.getById(l_id, true)
        return Object.assign(lead, {
          id: undefined,
          active: true,
          forSale: false,
          bought_from: lead.ownerId,
          ownerId: new_owner,
        })
      })
      .map(async leadPromise => {
        const lead = await leadPromise
        await this.insert(lead)

        return lead
      })

    return Promise.all(lead_promises)
  }

  async getById(id: number, includeDeleted = false) {
    const condition = { id }
    const [record] = await this.find({ condition })
    if (!record.active && !includeDeleted) {
      return undefined
    }
    return record
  }

  async remove(id: number) {
    const status = await this.update(id, { active: false })
    return status
  }
}
