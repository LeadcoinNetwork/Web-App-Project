import { IModels } from "./index"
import { Notification } from "../models/notifications/types"

export default class Notifications {
  constructor(private models: IModels) {}

  public async getNotifications(user_id: number) {
    return await this.models.notifications.getNotificationsByUserId(user_id)
  }
}
