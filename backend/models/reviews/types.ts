export interface Review {
  toUserId: number
  fromUserId: number
  date: number
  comment: string
  rating: number
}

export interface ReviewQueryOptions {
  id?: number
  toUserId?: number
  fromUserId?: number
  date?: number
  comment?: string
  rating?: number
  limit?: any
  sort?: any
}
