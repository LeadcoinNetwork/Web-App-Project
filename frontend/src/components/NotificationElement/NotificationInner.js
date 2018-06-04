import React, { Component } from "react";

import { format } from "../../utils/timeformat";

class NotificationInner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    var { notifications } = this.props;
    return (
      <div className="notification-inner">
        {notifications.map(notification => (
          <div key={notification.id}>
            <b>{format(notification.timestamp)}</b> {notification.message}
          </div>
        ))}
      </div>
    );
  }
}

export default NotificationInner;
