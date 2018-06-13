import React from "react"
import NotificationInner from "./NotificationInner"

import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faBell from "@fortawesome/fontawesome-free-regular/faBell"

const NotificationElement = ({
  unreadCount,
  list,
  isOpen,
  showNotifications,
  hideNotifications,
}) => {
  debugger
  return (
    <div>
      <div className="notification-element" onClick={isOpen ? hideNotifications : showNotifications}>
        <FontAwesomeIcon
          className="notification-icon"
          icon={faBell}
          color="white"
          size={"3x"}
        />
        {unreadCount > 0 && (
          <div
            className={"notification-badge" + (unreadCount > 9 ? " plus" : "")}
          >
            {unreadCount < 10 ? unreadCount : "9+"}
          </div>
        )}
      </div>
      {isOpen && <NotificationInner list={list} />}
    </div>
  )
}

export default NotificationElement
