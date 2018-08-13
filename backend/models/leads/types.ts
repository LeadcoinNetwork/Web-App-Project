import { Currency } from "../../utils/currency"

export interface LeadQueryOptions {
  id?: number
  condition?: any
  sort?: any
  sort_by?: any
  email?: string
  fields?: string[]
  page?: number
  limit?: any
  bought_from?: number
  ownerId?: number
  active?: boolean
  filters?: object[]
}

export interface BaseLead {
  id?: number
  Price: number
  Description: string
  "Lead Price": number
  date: number
  Telephone: string
  bought_from: number | null
  ownerId: number
  forSale: boolean
  active: boolean
  meta?: any
}

export interface NewBaseLead {
  date: number
  Telephone?: string
  "Lead Price": any
  bought_from?: number | null
  forSale?: boolean
  active: boolean
  Description?: string
  agree_to_terms?: boolean
  meta?: any
}
export interface NewRealEstateLead extends NewBaseLead {
  "Lead Type": "realestate"
  Description: string
  Price: number
  "Bedrooms/Baths": string
  "Contact Person": string
  Type: "Sell" | "Rent"
  Size?: number
  State?: string
  Location?: number
  "Housing Type"?: string
  Specification?: string
  "Property Type"?: string
}

// Description,Bedrooms / Baths,Type,Price,Size,State,Location,Housing Type,Telephone,Contact Person
export interface RealEstateLead extends BaseLead {
  "Lead Type": "realestate"
  Description: string
  Price: number
  "Bedrooms/Baths": string
  "Contact Person": string
  Type: "Sell" | "Rent"
  Size?: number
  State?: string
  Location?: number
  "Housing Type"?: string
  Specification?: string
  "Property Type"?: string
}

export type Lead = BaseLead | RealEstateLead
export type NewLead = NewBaseLead | NewRealEstateLead
