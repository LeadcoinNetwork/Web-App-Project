import React from "react";
import { format } from "../../utils/timeformat";

const NotificationsTable = props =>
  props.notifications.map(notification => (
    <div key={notification.id}>
      <b>{format(notification.timestamp)}</b> {notification.message}
    </div>
  ));

export default NotificationsTable;
