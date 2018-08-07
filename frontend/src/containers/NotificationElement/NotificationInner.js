import React from "react"
import { Link } from "react-router-dom"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faEye from "@fortawesome/fontawesome-free-solid/faEye"
import { fromNow } from "../../utils/time"
import t from "../../utils/translate/translate"

const NotificationInner = ({ list }) => (
  // <Link to="/notifications" className="notification-inner">
  <div className="notification-inner">
    <div className="small-arrow" />
    {list.slice(0, 9).map(notification => (
      <div key={notification.id}>
        <div
          className={"ni-row" + (notification.unread ? " unread" : "")}
          key={notification.id}
        >
          <span className="nr-time">{fromNow(notification.timestamp)}</span>{" "}
          {t(notification.msg)}
        </div>
      </div>
    ))}
    {/* <div className="view-all">
      <FontAwesomeIcon
        className="view-all-icon"
        icon={faEye}
        color={"white"}
        size={"1x"}
      />
      <span className="view-all-text">{t("View All Notifications")}</span>
    </div> */}
    {list.length === 0 && (
      <div className="ni-row">{t("You Have No Notifications")}</div>
    )}
  </div>
  // </Link>
)

export default NotificationInner
