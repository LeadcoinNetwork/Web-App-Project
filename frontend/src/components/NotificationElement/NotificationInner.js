import React, { Component } from "react";

import { format } from "../../utils/timeformat";

const NotificationInner = props => (
  <div className="notification-inner">
    {props.notifications.map(notification => (
      <div key={notification.id}>
        <b>{format(notification.timestamp)}</b> {notification.message}
      </div>
    ))}
  </div>
);

export default NotificationInner;
