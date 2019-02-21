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
  industry: Industry
  contact_person: string
  // Category: WebBuildingCategory | CryptoCategory
  price: number
  lead_price: number
  date: number
  telephone: string
  email: string
  bought_from: number | null
  ownerId: number
  forSale: boolean
  active: boolean
  meta?: any
}

export interface WebBuildingLead extends BaseLead {
  industry: "Web Building"
  // Category: WebBuildingCategory
  pages: number
  content_updates: "Mostly Static" | "Dynamic"
  functionality: string[]
  mobile_design: "Yes" | "No"
  seo: "Yes" | "No"
  content_management: "Yes" | "No"
  e_commerce: "Yes" | "No"
  blog: "Yes" | "No"
  budget: number
  languages: string[]
  hosting: "Yes" | "No"
  comments: string
}

export type Lead = WebBuildingLead
