import React from "react"
import NotificationInner from "./NotificationInner"

import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faBell from "@fortawesome/fontawesome-free-regular/faBell"

const NotificationElement = (props) => {
  return (
    <div>
      <div className="notification-element" onClick={props.handleToggle}>
        <FontAwesomeIcon className="notification-icon" icon={faBell} color="white" size={'3x'} />
        {props.unreadCount > 0 && (
          <div
            className={
              "notification-badge" + (props.unreadCount > 9 ? " plus" : "")
            }
          >
            {props.unreadCount < 10 ? props.unreadCount : "9+"}
          </div>
        )}
      </div>
      <NotificationInner {...props} />
    </div>
  )
}

export default NotificationElement
