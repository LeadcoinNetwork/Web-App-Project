type timestamp = number

export interface BaseUserInterface {
  fname: string
  lname: string
  email: string
  disabled?: disabledResons
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
  EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED",
}
