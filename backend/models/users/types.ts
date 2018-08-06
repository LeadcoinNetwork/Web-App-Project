type timestamp = number

export interface BaseUserInterface {
  fname: string
  lname: string
  email: string
  disabled?: disabledReason
  emailConfirmationKey?: string
  country?: string
  phone?: string
  company?: string
  balance?: number
}
export interface ExistingUserInterface extends BaseUserInterface {
  password: string
  id: number
  emailConfirmationKey: string
  disabled: disabledReason
  created: number
  balance: number
}
export interface ExistingUserInterfaceCondition {
  id?: number
  fname?: string
  disabled?: disabledReason
  emailConfirmationKey?: string
  lname?: string
  email?: string
  password?: string
  /**? Timestamp */
  created?: number
  provider_id?
  provider?
  country?: string
  phone?: string
  company?: string
}

export interface NewUserInterface extends BaseUserInterface {
  plainPassword?: string
}

export enum disabledReason {
  // do not change strings. Frontend & API depends on it
  EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED",
  PROFILE_NOT_COMPLETED = "PROFILE_NOT_COMPLETED",
}
