import { IModels } from "./index"
import { Notification } from "../models/notifications/types"

export default class Notifications {
  constructor(private models: IModels) {}

  public async getNotifications(user_id: number) {
    let notifications = await this.models.notifications.getNotificationsByUserId(
      user_id,
    )
    if (notifications.length > 0) {
      let ids = notifications.map(n => n.id)
      await this.models.notifications.MarkNotificationAsRead(ids)
    }
    return notifications
  }
}
