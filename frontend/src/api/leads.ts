//@ts-ignore

import { methods, request } from "./request"
import {
  Lead,
  NewLead,
  LeadQueryOptions,
} from "../../../backend/models/leads/types"

//@ts-ignore
import papaParse from "papaparse"

interface LeadsApiOptions {
  sort_by?: [string, "ASC" | "DESC"]
  filters?: [string, string][]
}

let mockCsv = `Date Published,Description,Bedrooms / Baths,Type,Price,Size,State,Location,Housing Type,Telephone,Contact Person,Lead Price
Jul 31,LARGE-2-FAMILY HOUSE FOR SALE BY OWNER BIG INDIAN UP STATE NY ON 3 AC,8BR,Sell,"$479,000",3000ft2,New York,Big Indian NY,Apartment,845-254-5455,Jerry,$10
Jul 31,"Rego Park for rent with parking , 30 minutes from Manhattan 1br - - (Financial District) ",1BR / 1Ba,Rent,"$2,000",800ft2,New York,Financial District,Apartment,(917) 655-4935,Mike,$10
Jul 31,Lovely Two-Family Home-Recently Reduced!!,5BR / 2Ba,Sell,"$169,900",2024ft2,New York,"Schenectady, NY",House,(917) 655-9357,Brad,$10
Jul 31,"3 Bedroom with 2 Bath , In Bay Terrace",3BR / 2Ba,Rent,"$2,450",,New York,"Bayside,Bay Terrace,Flushing,Whitestone",Apartment,(929) 357-7101,Mitchell,$10
Jul 31,Good investment for 1 Family House,,Sell,"$1,490,000",1840ft2,New York,Sunset Park,House,(929) 367-8934,John,$10
Jul 31,VITALIA AT TRADITION NEW 55+ COMMUNITY 2br,2BR / 2Ba,Sell,"$349,900",2018ft2,New York,PORT ST LUCIE,House,772-801-9808,George,$10
Jul 31,Beautifully Remodeled Brick Home 1538 Kennewick Road,3BR / 2.5Ba,Sell,"$169,900",1360ft2,New York,Ednor Gardens,,631-821-7624,Sherry,$10
Jul 31, Good investment for 1 Family House,,Sell,"$1,490,000",1840ft2,New York,Sunset Park,Apartment,646-772-3686,Christy,$10
Jul 31,Like new cape cod near rt 380 easy commute.,4BR / 3Ba,Sell,"$199,900",,New York,roaring brook twp,,646-142-3656,John,$10
Jul 31, WATERFRONT LOT 120 X 50 w/ ACTIVE BUILDING PERMIT !!,,Sell,"$495,000",6000ft2,New York,Cherry Grove,,631-821-0074,Pete,$10
Jul 31,one bedroom in rego park for RENT or SALE 2000 with parking,1BR,Rent,"$2,000",,New York,REGO PARK,Apartment,646.515.7653,Alexis,$10
Jul 22,ONE MONTH FREE RENT INCENTIVES and take ALL PROGRAMS. over 200 units,2BR / 1Ba,Rent,"$1,550",,New York,Upper West Side,Townhouse,646.515.1123,Frank,$10`

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

  async addMockLeads() {
    let mock_records = papaParse.parse(mockCsv, parseConfig).data
    //@ts-ignore
    window.mockIds = []
    mock_records.forEach(async line => {
      if (!line["Date Published"]) return
      const lead = {
        Description: line.Description,
	"Bedrooms/Baths": line["Bedrooms / Baths"],
        Type: line.Type,
        Price: line.Price,
        Size: line.Size,
        State: line.State,
        Location: line.Location,
        "Housing Type": line["Housing Type"],
        Telephone: line["Telephone"],
        "Contact Person": line["Contact Person"],
        lead_price: line["Lead Price"],
        "Lead Type": "realestate",
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
