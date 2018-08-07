import { IModels } from "./index"
import { Notification } from "../models/notifications/types"

export default class Notifications {
  constructor(private models: IModels) {}

  public async getNotificationsAndCount(
    user_id: number,
  ): Promise<[Notification[], number]> {
    let notifications = await this.models.notifications.getNotificationsByUserId(
      user_id,
    )
    let unreadCount = await this.models.notifications.getUnreadNotificationsCount(
      user_id,
    )
    if (notifications.length > 0) {
      let ids = notifications.map(n => n.id)
      await this.models.notifications.MarkNotificationAsRead(ids)
    }
    return [notifications, unreadCount]
  }
}
