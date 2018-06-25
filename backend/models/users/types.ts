type timestamp = number

export interface BaseUserInterface {
  fname: string
  lname: string
  email: string
  disabled: boolean
  password: string
}
export interface ExistingUserInterface extends BaseUserInterface {
  id: number
}
export interface ExistingUserInterfaceCondition {
  id?: number
  fname?: string
  lname?: string
  email?: string
  disabled?: boolean
  password?: string
  /**? Timestamp */
  created?: number
}

export interface NewUserInterface extends BaseUserInterface {
  plainPassword?: string
}
