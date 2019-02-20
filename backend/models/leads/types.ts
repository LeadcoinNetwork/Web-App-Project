// import { Currency } from "../../utils/currency"

export type Industry = "All" | "Web Building" | "Crypto" | "Insurance" | "Loans"
// export type WebBuildingCategory = "Buy" | "Sell"
// export type CryptoCategory = "Buy" | "Sell"

// export type Categories = "All" | WebBuildingCategory | CryptoCategory

export interface LeadQueryOptions {
  id?: number
  industry?: Industry
  // category?: WebBuildingCategory | CryptoCategory
  condition?: any
  user_id?: number
  sort?: any
  sort_by?: any
  email?: string
  fields?: string[]
  page?: number
  limit?: any
  bought_from?: number
  ownerId?: number
  active?: boolean
  filters?: object
}

export interface BaseLead {
  id?: number
  Industry: Industry
  "Contact Person": string
  // Category: WebBuildingCategory | CryptoCategory
  Price: number
  Description: string
  lead_price: number
  date: number
  Telephone: string
  Email: string
  bought_from: number | null
  ownerId: number
  forSale: boolean
  active: boolean
  meta?: any
}

export interface WebBuildingLead extends BaseLead {
  Industry: "Web Building"
  // Category: WebBuildingCategory
  "Number of pages": number
  "Content Updates": string
  Functionality: string
  "Mobile Design": boolean
  SEO: boolean
  "Content Management": boolean
  "E-commerce": boolean
  Blog: boolean
  Budget: number
  Languages: string
  Hosting: boolean
  Comments: string
}

export type Lead = WebBuildingLead
