export interface BaseNotification {
  msg: string
  userId: number
  unread?: boolean
}

export interface Notification extends BaseNotification {
  id: number
  unread: boolean
}

export interface NotificationQuery {
  unread: boolean
}
