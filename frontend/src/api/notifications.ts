import { methods, request } from "./request"

export default class NotificationsApi {
  constructor(private request: request) {}
  async getNotifications() {
    return await this.request(methods.get, "/notifications")
  }

  async createNotification(data) {
    return await this.request(methods.post, "/notifications", data)
  }
}
