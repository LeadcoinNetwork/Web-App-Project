import React from "react"
import { Time } from "../../utils/time"

const NotificationsTable = props =>
  props.notifications.map(notification => (
    <div key={notification.id}>
      <b>{Time.format(notification.timestamp)}</b> {notification.message}
    </div>
  ))

export default NotificationsTable
