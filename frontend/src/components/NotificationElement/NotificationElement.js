import React from "react"
import NotificationInner from "./NotificationInner"

import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faBell from "@fortawesome/fontawesome-free-regular/faBell"

const NotificationElement = ({
  unreadCount,
  list,
  isOpen,
  clickNotifications,
  viewAllNotifications,
}) => {
  return (
    <div>
      <div className="notification-element" onClick={clickNotifications}>
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
        {isOpen && <NotificationInner list={list} viewAllNotifications={viewAllNotifications} />}
      </div>
    </div>
  )
}

export default NotificationElement
