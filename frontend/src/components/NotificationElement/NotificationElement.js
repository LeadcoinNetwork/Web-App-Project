import React, { Component } from "react";
import NotificationInner from "./NotificationInner";
import "./Notification.scss";

const NotificationElement = props => (
  <div className="notification-element" onClick={props.toggle && props.toggle}>
    <div className="notification-icon">A</div>
    {props.unreadCount && (
      <div className="notification-badge">{props.unreadCount}</div>
    )}
    {props.opened && <NotificationInner {...props} />}
  </div>
);

export default NotificationElement;
