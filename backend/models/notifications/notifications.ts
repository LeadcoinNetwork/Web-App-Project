import SQL from "../mysql-pool/mysql-pool"
import * as passport from "passport"
import * as Express from "express"
import { NewNotification, Notification, NotificationQuery } from "./types"

import baseDBModel from "../base-db-model/base-db-model"

export default class Notifications extends baseDBModel<
  NewNotification,
  Notification,
  NotificationQuery
> {
  constructor(sql: SQL) {
    super(sql, "notifications")
  }

  async createNotification(notification: NewNotification) {
    notification = Object.assign(notification, {
      timestamp: new Date().valueOf(),
    })
    return await this.insert(notification)
  }

  async getUnreadNotificationsCount(userId: number) {
    return await this.notificationsQueries.getUnreadNotificationsCount(userId)
  }

  async getNotificationsByUserId(userId: number) {
    return await this.notificationsQueries.getNotificationsByUserId(userId)
  }

  async getNotificationById(notification_id: number) {
    return await this.getOne({ id: notification_id })
  }

  async MarkNotificationAsRead(ids: number[]) {
    return await this.notificationsQueries.markAsReadByIds(ids)
  }

  async MarkAllNotificationAsReadForUser(userId: number) {
    return await this.notificationsQueries.markAsRead(userId)
  }
}
