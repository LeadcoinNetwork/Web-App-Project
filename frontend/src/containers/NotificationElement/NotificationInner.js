import React from "react"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faEye from "@fortawesome/fontawesome-free-solid/faEye"
import { Time } from "../../utils/time"

const NotificationInner = ({ list, viewAllNotifications }) => (
  <div className="notification-inner" onClick={viewAllNotifications}>
    <div className="small-arrow" />
    {list.map(notification => (
      <div>
        <div
          className={"ni-row" + (notification.unread ? " unread" : "")}
          key={notification.id}
        >
          <span className="nr-time">
            {Time.fromNow(notification.timestamp)}
          </span>{" "}
          {notification.message}
        </div>
        {/* <div className="seperation-line" /> */}
      </div>
    ))}
    <div className="view-all">
      <FontAwesomeIcon
        className="view-all-icon"
        icon={faEye}
        color={"white"}
        size={"1x"}
      />
      <span className="view-all-text">View All Notifications</span>
    </div>
  </div>
)

export default NotificationInner
