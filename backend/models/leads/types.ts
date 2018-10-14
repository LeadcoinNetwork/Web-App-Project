import { Currency } from "../../utils/currency"

export type Lead = BaseLead | RealEstateLead
export type NewLead = NewBaseLead | NewRealEstateLead

export type Industry = "Real Estate" | "Crypto" | "Insurance" | "Loans"
export type RealEstateCategory =
  | "Buy"
  | "Sell"
  | "Looking to rent"
  | "Properties for rent"
export type CryptoCategory = "Buy" | "Sell"
export type Categories = RealEstateCategory | CryptoCategory

export interface LeadQueryOptions {
  id?: number
  industry?: Industry
  category?: RealEstateCategory | CryptoCategory
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
  filter?: undefined[] | Filter
}

export interface RawLeadQueryOptions {
  sortBy?: string
  page?: string
  limit?: string
  sortOrder?: string
  filter?: Filter
  user?: any
}

export interface BaseLead {
  id?: number
  Industry: Industry
  Category: RealEstateCategory | CryptoCategory
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
  Industry: Industry
  Category: RealEstateCategory | CryptoCategory
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
  Industry: "Real Estate"
  Category: RealEstateCategory
  Description: string
  Price: number
  "Bedrooms/Baths": string
  "Contact Person": string
  Size?: number
  State?: string
  Location?: number
  "Housing Type"?: string
  Specification?: string
  "Property Type"?: string
}

// Industry,Category,Description,Bedrooms / Baths,Price,Size,State,Location,Housing Type,Telephone,Contact Person
export interface RealEstateLead extends BaseLead {
  Industry: "Real Estate"
  Category: RealEstateCategory
  Description: string
  Price: number
  "Bedrooms/Baths": string
  "Contact Person": string
  Size?: number
  State?: string
  Location?: number
  "Housing Type"?: string
  Specification?: string
  "Property Type"?: string
}

export interface Filter {
  industry: Industry
  category: Categories
  search: string
  industryFilters: IndustryFilter[]
}

export interface IndustryFilter {
  name: string
  type: string
  inputType?: string
  min?: string
  max?: string
  options?: string[]
  value?: string
  from?: string
  to?: string
}
