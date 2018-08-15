import React, { Component } from "react"
import NotificationInner from "./NotificationInner"
import { connect } from "react-redux"
import { notifications } from "Actions"

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
    let { unreadCount, list, isOpen, notificationsClick } = this.props
    return (
      <div
        className="ldc-notification-element far icon bell"
        onClick={e => {
          e.stopPropagation()
          notificationsClick()
        }}
      >
        {unreadCount > 0 && (
          <div
            className={"notification-badge" + (unreadCount > 9 ? " plus" : "")}
          >
            {unreadCount < 10 ? unreadCount : "9+"}
          </div>
        )}
        {isOpen && <NotificationInner list={list.slice(0, 5)} />}
      </div>
    )
  }
}

const mapStateToProps = state => state.notifications

const mapDispatchToProps = {
  notificationsClick: notifications.notificationsClick,
}

const NotificationElementConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationElement)

export default NotificationElementConnected
