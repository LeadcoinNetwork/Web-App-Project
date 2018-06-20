type timestamp = number

export interface BaseUserInterface {
  id: number
  fname: string
  lname: string
  email: string
  disabled: boolean
  password: string
  /** Timestamp */
  created: number
}
export interface ExistingUserInterface extends BaseUserInterface {
  id: number
}

export interface NewUserInterface extends BaseUserInterface {}
