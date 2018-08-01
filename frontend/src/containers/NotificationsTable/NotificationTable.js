import React from "react"
import { connect } from "react-redux"
// import { notificationsTable } from "Actions"
import { localeString } from "Utils/time"
import t from "../../utils/translate/translate"

const NotificationsTable = ({ loading, list, error }) => (
  <div className="notifications-table">
    <h1>{t("Notifications")}</h1>
    <h3>{t("See buy/sell alerts and check your system messages.")}</h3>
    <div className="nt-content">
      {loading && <div>{t("Loading...")}</div>}
      {error && <div>{t(error)}</div>}
      {list.map(notification => (
        <div className="nt-row" key={notification.id}>
          {localeString(notification.timestamp)} - {t(notification.message)}
        </div>
      ))}
    </div>
  </div>
)

const mapStateToProps = state => state.notificationsTable

const NotificationsTableConnected = connect(mapStateToProps)(NotificationsTable)

export default NotificationsTableConnected
