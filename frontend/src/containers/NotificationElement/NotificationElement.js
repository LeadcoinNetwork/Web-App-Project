import { connect } from "react-redux"
import NotificationElement from "Components/NotificationElement"
import { notifications } from "Actions"

var mapStateToProps = state => state.notifications

var mapDispatchToProps = {
  showNotifications: notifications.showNotifications,
  hideNotifications: notifications.hideNotifications,
}

var NotificationElementConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationElement)

export default NotificationElementConnected
