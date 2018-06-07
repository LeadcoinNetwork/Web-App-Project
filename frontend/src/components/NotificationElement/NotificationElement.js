import React, { Component } from "react";
import NotificationInner from "./NotificationInner";
import "./Notification.scss";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBell from "@fortawesome/fontawesome-free-solid/faBell";

const NotificationElement = props => (
  <div className="notification-element" onClick={props.toggle}>
    <FontAwesomeIcon className="notification-icon" icon={faBell} size={6} />
    {props.unreadCount > 0 && (
      <div className={"notification-badge" + (props.unreadCount > 9 ? " plus" : "")}>
        {props.unreadCount < 10 ? props.unreadCount : "9+"}
      </div>
    )}
    {props.opened && <NotificationInner {...props} />}
  </div>
);

export default NotificationElement;
