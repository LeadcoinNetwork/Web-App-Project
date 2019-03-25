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
    {list.map(notification => (
      <div key={notification.id}>
        <div
          className={"ni-row" + (notification.unread ? " unread" : "")}
          key={notification.id}
        >
          <div className="nr-time">{fromNow(notification.timestamp)}</div>{" "}
          {notification.txHash ? (
            <div className="nr-content">
              {" "}
              {t(notification.msg)} <br />
              <a
                href={"https://etherscan.io/tx/" + notification.txHash}
                target="_blank"
              >
                View at Etherscan
              </a>
            </div>
          ) : (
            <div className="nr-content"> {t(notification.msg)}</div>
          )}
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
      <div className="ni-row">{t("You have no notifications.")}</div>
    )}
  </div>
  // </Link>
)

export default NotificationInner
