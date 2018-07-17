import { Currency } from "../../utils/currency"

export interface LeadQueryOptions {
  id?: number
  sort_by?: [string, "ASC" | "DESC"]
  email?: string
  fields?: string[]
  page?: number
  limit?: number
  bought_from?: number
  owner_id?: number
  active?: boolean
  filters?: [string, string][]
}

export interface BaseLead {
  id?: number
  price: number
  date: number
  name: string
  phone: string
  email: string
  bought_from: number | null
  owner_id: number
  active: boolean
  currency: Currency
  bought_currency: Currency | null
}

export interface NewBaseLead {
  date: number
  name: string
  phone: string
  email: string
  bought_from: number | null
  active: boolean
  // bought_currency: Currency
}

export interface RealEstateLead extends BaseLead {
  type: "realestate"
  city?: string
  size?: number
  state?: string
  floor?: number
  budget?: number
  bedrooms?: number
  specification?: string
  property_type?: string
}

export type Lead = BaseLead | RealEstateLead
export type NewLead = NewBaseLead
