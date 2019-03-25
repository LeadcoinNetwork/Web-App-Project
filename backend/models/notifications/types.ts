export interface BaseNotification {
  msg: string
  userId: number
  unread?: boolean
  txHash?: string
}

export interface Notification extends BaseNotification {
  id: number
  unread: boolean
}

export interface NotificationQuery {
  unread: boolean
}
