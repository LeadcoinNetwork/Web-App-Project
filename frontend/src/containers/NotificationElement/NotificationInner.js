import React from "react"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faEye from "@fortawesome/fontawesome-free-solid/faEye"
import { fromNow } from "../../utils/time"
import t from "../../utils/translate/translate"

const NotificationInner = ({ list, notificatiosViewAll }) => (
  <div className="notification-inner" onClick={notificatiosViewAll}>
    <div className="small-arrow" />
    {list.map(notification => (
      <div>
        <div
          className={"ni-row" + (notification.unread ? " unread" : "")}
          key={notification.id}
        >
          <span className="nr-time">{fromNow(notification.timestamp)}</span>{" "}
          {t(notification.message)}
        </div>
      </div>
    ))}
    <div className="view-all">
      <FontAwesomeIcon
        className="view-all-icon"
        icon={faEye}
        color={"white"}
        size={"1x"}
      />
      <span className="view-all-text">{t("View All Notifications")}</span>
    </div>
  </div>
)

export default NotificationInner
