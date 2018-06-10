import React, { Component } from "react"

import { Time } from "../../utils/time"

const NotificationInner = props => (
  <div className="notification-inner">
    {props.notifications.map(notification => (
      <div
        className={"ni-row" + (notification.unread ? " unread" : "")}
        key={notification.id}
      >
        <b>{Time.fromNow(notification.timestamp)}</b> {notification.message}
      </div>
    ))}
    <div className="see-all" onClick={props.seeAll}>
      See All...
    </div>
  </div>
)

export default NotificationInner
