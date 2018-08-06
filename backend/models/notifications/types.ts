export interface BaseNotification {
  msg: string
  userId: number
}

export interface NewNotification extends BaseNotification {
  id?: number
  unread: true
}

export interface Notification extends BaseNotification {
  id: number
  unread: boolean
}

export interface NotificationQuery {
  unread: boolean
}
