import SQL from "../mysql-pool/mysql-pool"
// import * as passport from "passport"
// import * as Express from "express"
import { BaseNotification, Notification, NotificationQuery } from "./types"

import baseDBModel from "../base-db-model/base-db-model"

export default class Notifications extends baseDBModel<
  BaseNotification,
  Notification,
  NotificationQuery
> {
  constructor(sql: SQL) {
    super(sql, "notifications")
  }

  public async sendNotificationForFavorites(userIds: number[]) {
    for (const userId of userIds) {
      this.createNotification({
        msg: "Your favorites leads are on sale again.",
        userId: userId,
        unread: true,
      })
    }
  }

  async createNotification(notification: BaseNotification) {
    notification = Object.assign(notification, {
      timestamp: new Date().valueOf(),
      unread: true,
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
