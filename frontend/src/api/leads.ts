import { methods, request } from "./request"
import { NewBaseLead } from "../../../backend/models/leads/types"
import {
  Lead,
  NewLead,
  LeadQueryOptions,
} from "../../../backend/models/leads/types"

import papaParse from "papaparse"

interface LeadsApiOptions {
  sort_by?: [string, "ASC" | "DESC"]
  filters?: [string, string][]
}
let mockCsv = `
  LARGE-2-FAMILY HOUSE FOR SALE BY OWNER BIG INDIAN UP STATE NY ON 3 AC,8BR,Sell,"$479000",3000ft2,New York,Big Indian NY,Apartment,845-254-5455,Jerry
  "Rego Park for rent with parking , 30 minutes from Manhattan 1br - - (Financial District) ",1BR / 1Ba,Rent,"$2000",800ft2,New York,Financial District,Apartment,(917) 655-4935,Mike
  Lovely Two-Family Home-Recently Reduced!!,5BR / 2Ba,Sell,"$169900",2024ft2,New York,"Schenectady, NY",House,(917) 655-9357,Brad
  "3 Bedroom with 2 Bath , In Bay Terrace",3BR / 2Ba,Rent,"$2450",,New York,"Bayside,Bay Terrace,Flushing,Whitestone",Apartment,(929) 357-7101,Mitchell
  Good investment for 1 Family House,,Sell,"$1490000",1840ft2,New York,Sunset Park,House,(929) 367-8934,John
  VITALIA AT TRADITION NEW 55+ COMMUNITY 2br,2BR / 2Ba,Sell,"$349900",2018ft2,New York,PORT ST LUCIE,House,772-801-9808,George
  Beautifully Remodeled Brick Home 1538 Kennewick Road,3BR / 2.5Ba,Sell,"$169900",1360ft2,New York,Ednor Gardens,,631-821-7624,Sherry
  Good investment for 1 Family House,,Sell,"$1,490,000",1840ft2,New York,Sunset Park,Apartment,646-772-3686,Christy
  Like new cape cod near rt 380 easy commute.,4BR / 3Ba,Sell,"$199900",,New York,roaring brook twp,,646-142-3656,John
  WATERFRONT LOT 120 X 50 w/ ACTIVE BUILDING PERMIT !!,,Sell,"$495000",6000ft2,New York,Cherry Grove,,631-821-0074,Pete
  one bedroom in rego park for RENT or SALE 2000 with parking,1BR,Rent,"$2000",,New York,REGO PARK,Apartment,646.515.7653,Alexis
  ONE MONTH FREE RENT INCENTIVES and take ALL PROGRAMS. over 200 units,2BR / 1Ba,Rent,"$1550",,New York,Upper West Side,Townhouse,646.515.1123,Frank
`

export default class LeadsApi {
  constructor(private request: request) {}

  async addMockLeads() {
    let mock_records = mockCsv.split("\n")
    mock_records.forEach(line => {
      const mr = line.split(",")
      if (mr.length === 1) return
      const lead: NewLead = {
        description: mr[0],
        bedrooms_baths: mr[1],
        type: mr[2],
        price: mr[3],
        size: mr[4],
        state: mr[5],
        location: mr[6],
        housing_type: mr[7],
        telephone: mr[8],
        contact_person: mr[9],
        lead_type: "realestate",
        date: new Date().valueOf(),
        bought_from: null,
        active: true,
      }
      this.sellLeadsAddByForm(lead)
    })
  }

  async sellLeadsAddByForm(lead: NewLead) {
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
