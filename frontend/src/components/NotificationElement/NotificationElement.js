import React from "react"
import NotificationInner from "./NotificationInner"

import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faBell from "@fortawesome/fontawesome-free-regular/faBell"

const NotificationElement = ({
  unreadCount,
  handleToggle,
  notifications,
  isOpen,
}) => {
  return (
    <div>
      <div className="notification-element" onClick={handleToggle}>
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
      {isOpen && <NotificationInner notifications={notifications} />}
    </div>
  )
}

export default NotificationElement
