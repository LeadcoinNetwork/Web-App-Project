import React from "react"
import NotificationInner from "./NotificationInner"

import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faBell from "@fortawesome/fontawesome-free-regular/faBell"
import { connect } from "react-redux"
import { notifications } from "Actions"

const NotificationElement = ({
  unreadCount,
  list,
  isOpen,
  notificationsClick,
  notificationsViewAll,
}) => {
  return (
    <div className="notification-element" onClick={notificationsClick}>
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
      {isOpen && (
        <NotificationInner
          list={list}
          notificationsViewAll={notificationsViewAll}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => state.notifications

const mapDispatchToProps = {
  notificationsClick: notifications.notificationsClick,
  notificationsViewAll: notifications.notificationsViewAll,
}

const NotificationElementConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationElement)

export default NotificationElementConnected
