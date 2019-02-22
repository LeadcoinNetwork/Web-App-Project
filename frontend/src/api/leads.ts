//@ts-ignore

import { methods, request } from "./request"

//@ts-ignore

interface LeadsApiOptions {
  sort_by?: [string, "ASC" | "DESC"]
  filters?: [string, string][]
}

let leads_mock = require("mocks/leads.json")

const pFileReader = file => {
  //@ts-ignore
  return new Promise((resolve, reject) => {
    //@ts-ignore
    let reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsText(file)
  })
}

export default class LeadsApi {
  constructor(private request: any) {}

  async buyMeOut() {
    await this.request(methods.post, "/sell-leads/buymyleads")
    //@ts-ignore
    setTimeout(() => {
      // @ts-ignore
      window.triggerFetch()
    }, 750)
  }

  async editLeadsEditByForm(lead) {
    return await this.request(methods.post, "/leads/update", lead)
  }

  async loadLeadForEdit(id) {
    return await this.request(methods.get, "/leads/" + id)
  }

  async addMockLeads() {
    //@ts-ignore
    window.mockIds = []
    leads_mock.forEach(async lead => {
      lead.agree_to_terms = true
      lead.meta = { mock: true }
      //@ts-ignore
      let { response } = await window.apiClient.leads.sellLeadsAddByForm(lead)
    })
    //@ts-ignore
    window.triggerFetch()
  }

  async sellLeadsCsvMapping({ fields_map, lead_price, agree_to_terms, file }) {
    //@ts-ignore
    const fileContent = await pFileReader(file)
    return await this.request(methods.post, "/csv/upload", {
      fields_map,
      lead_price,
      agree_to_terms,
      fileContent,
    })
  }

  async sellLeadsAddByForm(lead) {
    return await this.request(methods.post, "/sell-leads/addbyform", { lead })
  }

  async buyLeadsGetList(filters?) {
    return await this.request(methods.get, "/buy-leads", null, { ...filters })
  }

  async buyLeadsBuy(leads: string[]) {
    return await this.request(methods.post, "/buy-leads/buy", { leads })
  }

  async sellLeadsGetList(options: LeadsApiOptions) {
    return await this.request(methods.get, "/sell-leads", null, { ...options })
  }

  async getMyLeads(options: LeadsApiOptions) {
    return await this.request(methods.get, "/my-leads", null, { ...options })
  }

  async myLeadsMoveToSell(leads: string[]) {
    return await this.request(methods.post, "/my-leads/move", { leads })
  }

  async getSoldLeads(options: LeadsApiOptions) {
    return await this.request(methods.get, "/leads/sold", null, { ...options })
  }
}
