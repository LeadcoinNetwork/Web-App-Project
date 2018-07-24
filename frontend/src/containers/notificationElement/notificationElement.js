import React, { Component } from "react"
import NotificationInner from "./notificationInner"
import { connect } from "react-redux"
import { notifications } from "../../actions"

class NotificationElement extends Component {
  handleClick = () => {
    if (this.props.isOpen) {
      this.props.notificationsClick()
    }
  }

  componentDidMount() {
    window.addEventListener("click", this.handleClick)
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClick)
  }

  render() {
    let {
      unreadCount,
      list,
      isOpen,
      notificationsClick,
      notificationsViewAll,
    } = this.props
    return (
      <i
        className="ldc-notification-element far fa-bell"
        onClick={e => {
          e.stopPropagation()
          notificationsClick()
        }}
      >
        {unreadCount > 0 && (
          <i
            className={"notification-badge" + (unreadCount > 9 ? " plus" : "")}
          >
            {unreadCount < 10 ? unreadCount : "9+"}
          </i>
        )}
        {isOpen && (
          <NotificationInner
            list={list}
            notificationsViewAll={notificationsViewAll}
          />
        )}
      </i>
    )
  }
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
