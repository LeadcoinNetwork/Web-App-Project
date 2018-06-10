const mysqlPool = require("../mysql-pool/mysql-pool")
import "./notification.test.js"

/**
 * @typedef RealTimeSender
 * 		@property {({userid:number,message:string})=>number} send
 * }
 */

class Notifications {
  /**
   * @param options {{b:number,realtime:RealTimeSender}}
   */
  constructor(options) {}
  /**
   * - Add a notification to the database
   * - Email the notification to the user
   * - Send a notification to the user in realtime
   * @param options {{userid:number}}
   */
  createNotification(options) {}
  getUnreadNotificationsForUser() {}
  getNotificationById() {}
  MarkAllNotificationAsReadForUser() {}
}

module.exports = { Notifications }
