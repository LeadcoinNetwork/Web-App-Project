import { connect } from "react-redux"
import NotificationElement from "Components/NotificationElement"
import { notifications } from "Actions"

const mapStateToProps = state => state.notifications

const mapDispatchToProps = {
  clickNotifications: notifications.clickNotifications,
  viewAllNotifications: notifications.viewAllNotifications
}

const NotificationElementConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationElement)

export default NotificationElementConnected
