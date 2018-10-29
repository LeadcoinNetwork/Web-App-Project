//@ts-ignore

import { methods, request } from "./request"
import {
  Lead,
  NewLead,
  Filter,
  Industry,
  Categories,
} from "../../../backend/models/leads/types"

//@ts-ignore
import papaParse from "papaparse"

interface LeadsApiOptions {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: [string, "ASC" | "DESC"]
  filter?: Filter
}

let mockCsv = `Industry,Category,Description,Bedrooms/Baths,Price,Size,State,Location,Housing Type,Telephone,Contact Person,Lead Price
Real Estate,Sell,LARGE-2-FAMILY HOUSE FOR SALE BY OWNER BIG INDIAN UP STATE NY ON 3 AC,8BR,479000,3000,NY,Big Indian NY,Apartment,845-254-5455,Jerry,10
Real Estate,Properties for rent,"Rego Park for rent with parking , 30 minutes from Manhattan 1br - - (Financial District) ",1BR / 1Ba,2000,800,NY,Financial District,Apartment,(917) 655-4935,Mike,10
Real Estate,Sell,Lovely Two-Family Home-Recently Reduced!!,5BR / 2Ba,169900,2024,NY,"Schenectady, NY",House,(917) 655-9357,Brad,10
Real Estate,Properties for rent,"3 Bedroom with 2 Bath , In Bay Terrace",3BR / 2Ba,2450,,NY,"Bayside,Bay Terrace,Flushing,Whitestone",Apartment,(929) 357-7101,Mitchell,10
Real Estate,Sell,Good investment for 1 Family House,,1490000,1840,NY,Sunset Park,House,(929) 367-8934,John,10
Real Estate,Sell,VITALIA AT TRADITION NEW 55+ COMMUNITY 2br,2BR / 2Ba,349900,2018,NY,PORT ST LUCIE,House,772-801-9808,George,10
Real Estate,Sell,Beautifully Remodeled Brick Home 1538 Kennewick Road,3BR / 2.5Ba,169900,1360,NY,Ednor Gardens,,631-821-7624,Sherry,10
Real Estate,Sell, Good investment for 1 Family House,,1490000,1840,NY,Sunset Park,Apartment,646-772-3686,Christy,10
Real Estate,Sell,Like new cape cod near rt 380 easy commute.,4BR / 3Ba,199900,,NY,roaring brook twp,,646-142-3656,John,10
Real Estate,Sell, WATERFRONT LOT 120 X 50 w/ ACTIVE BUILDING PERMIT !!,,495000,6000,NY,Cherry Grove,,631-821-0074,Pete,10
Real Estate,Properties for rent,one bedroom in rego park for RENT or SALE 2000 with parking,1BR,2000,,NY,REGO PARK,Apartment,646.515.7653,Alexis,10
Real Estate,Properties for rent,ONE MONTH FREE RENT INCENTIVES and take ALL PROGRAMS. over 200 units,2BR / 1Ba,1550,,NY,Upper West Side,Townhouse,646.515.1123,Frank,10`

const parseConfig = {
  delimiter: ",",
  quotedChar: '"',
  header: true,
}

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

  async deleteLead(ids) {
    return await this.request(methods.post, "/myleads/remove", { ids })
  }

  async loadLeadForEdit(id) {
    return await this.request(methods.get, "/leads/" + id)
  }

  async addMockLeads() {
    let mock_records = papaParse.parse(mockCsv, parseConfig).data
    //@ts-ignore
    window.mockIds = []
    mock_records.forEach(async line => {
      if (!line["Date Published"]) return
      const lead: NewLead = {
        Industry: line.Industry,
        Category: line.Category,
        Description: line.Description,
        "Bedrooms/Baths": line["Bedrooms/Baths"],
        Price: line.Price,
        Size: line.Size,
        State: line.State,
        Location: line.Location,
        "Housing Type": line["Housing Type"],
        Telephone: line["Telephone"],
        "Contact Person": line["Contact Person"],
        lead_price: line["Lead Price"],
        date: new Date().valueOf(),
        meta: { mock: true },
        bought_from: null,
        agree_to_terms: true,
        active: true,
      }
      //@ts-ignore
      let { response } = await window.apiClient.leads.sellLeadsAddByForm(lead)
    })
    //@ts-ignore
    window.triggerFetch()
  }

  async sellLeadsCsvMapping({
    fields_map,
    lead_price,
    agree_to_terms,
    file,
    industry,
  }) {
    //@ts-ignore
    const fileContent = await pFileReader(file)
    return await this.request(methods.post, "/csv/upload", {
      fields_map,
      lead_price,
      agree_to_terms,
      fileContent,
      industry,
    })
  }

  async sellLeadsAddByForm(lead: NewLead) {
    return await this.request(methods.post, "/sell-leads/addbyform", { lead })
  }

  async getLeadsList(route, options: LeadsApiOptions) {
    let res = await this.request(methods.get, route, null, {
      ...options,
      filter: {
        ...options.filter,
        industryFilters: JSON.stringify(options.filter.industryFilters),
      },
    })
    return res.error
      ? res
      : {
          ...res,
          filter: {
            ...res.filter,
            industryFilters: res.filter.industryFilters
              ? JSON.parse(res.filter.industryFilters)
              : res.filter.industryFilters,
          },
        }
  }

  async buyLeadsBuy(leads: Lead[]) {
    return await this.request(methods.post, "/buy-leads/buy", { leads })
  }

  async myLeadsMoveToSell(leads: Lead[]) {
    return await this.request(methods.post, "/my-leads/move", { leads })
  }

  async getSoldLeads(options: LeadsApiOptions) {
    return await this.request(methods.get, "/leads/sold", null, { ...options })
  }
}
