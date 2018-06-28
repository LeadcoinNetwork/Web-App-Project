type timestamp = number

export interface BaseUserInterface {
  fname: string
  lname: string
  email: string
  disabled?: disabledResons
  emailConfirmationKey?: string
}
export interface ExistingUserInterface extends BaseUserInterface {
  password: string
  id: number
  disabled: disabledResons
  created: number
}
export interface ExistingUserInterfaceCondition {
  id?: number
  fname?: string
  disabled?: disabledResons
  emailConfirmationKey?: string
  lname?: string
  email?: string
  password?: string
  /**? Timestamp */
  created?: number
  provider_id?
  provider?
}

export interface NewUserInterface extends BaseUserInterface {
  plainPassword?: string
}

export enum disabledResons {
  // do not change strings. Frontend & API depends on it
  EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED",
  PROFILE_NOT_COMPLETED = "PROFILE_NOT_COMPLETED",
}
