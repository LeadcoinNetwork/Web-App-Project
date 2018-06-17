import React from "react"
import { connect } from "react-redux"
// import { notificationsTable } from "Actions"
import { Time } from "../../utils/time"

const NotificationsTable = ({ loading, list, error }) => (
  <div className="notifications-table">
    <div className="nt-title">Notifications</div>
    <div className="nt-content">
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {list.map(notification => (
        <div className="nt-row" key={notification.id}>
          {Time.localeString(notification.timestamp)} - {notification.message}
        </div>
      ))}
    </div>
  </div>
)

const mapStateToProps = state => state.notificationsTable

const NotificationsTableConnected = connect(mapStateToProps)(NotificationsTable)

export default NotificationsTableConnected
