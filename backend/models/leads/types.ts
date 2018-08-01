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
  price: number
  description: string
  date: number
  telephone: string
  bought_from: number | null
  ownerId: number
  forSale: boolean
  active: boolean
  currency: Currency
  bought_currency: Currency | null
}

export interface NewBaseLead {
  date: number
  telephone: string
  bought_from: number | null
  active: boolean
  description?: string
}
export interface NewRealEstateLead extends NewBaseLead {
  lead_type: "realestate"
  description: string
  bedrooms_baths: string
  contact_person: string
  ownerId?: number
  type: "Sell" | "Rent"
  size?: number
  lead_price?: number
  state?: string
  price: number
  location?: number
  housing_type?: string
  specification?: string
  property_type?: string
}

// Description,Bedrooms / Baths,Type,Price,Size,State,Location,Housing Type,Telephone,Contact Person
export interface RealEstateLead extends BaseLead {
  lead_type: "realestate"
  description: string
  price: number
  bedrooms_baths: string
  contact_person: string
  type: "Sell" | "Rent"
  size?: number
  state?: string
  location?: number
  housing_type?: string
  specification?: string
  property_type?: string
}

export type Lead = BaseLead | RealEstateLead
export type NewLead = NewBaseLead | NewRealEstateLead
