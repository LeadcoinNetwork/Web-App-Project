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
        {isOpen && <NotificationInner list={list} />}
      </i>
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
