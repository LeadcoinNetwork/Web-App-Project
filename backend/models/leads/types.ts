export interface BaseLead {
  date: number
  name: string
  phone: string
  email: string
  bought_from: number | null
}

export interface RealEstateLead extends BaseLead {
  type: 'realestate'
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