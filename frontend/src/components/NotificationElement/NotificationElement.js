import React, { Component } from "react";
import NotificationInner from "./NotificationInner";
import "./Notification.scss";

class NotificationElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggle = () => {
    this.setState({ opened: !this.state.opened });
  };

  render() {
    return (
      <div className="notification-element" onClick={this.toggle}>
        <div className="notification-icon">A</div>
        {this.props.unreadCount && (
          <div className="notification-badge">{this.props.unreadCount}</div>
        )}
        {this.state.opened && <NotificationInner {...this.props} />}
      </div>
    );
  }
}

export default NotificationElement;
