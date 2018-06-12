import React, { Component } from "react"
import NotificationInner from "./NotificationInner"

import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faBell from "@fortawesome/fontawesome-free-regular/faBell"
import Popover from 'material-ui/Popover';

class NotificationElement extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleClick = (e) => {
    e.preventDefault();
    this.props.handleToggle();
    this.setState({ anchorEl: e.currentTarget });
  }
  render(){
    var props=this.props

    return <div>
    <div className="notification-element" onClick={this.handleClick}>
      <FontAwesomeIcon className="notification-icon" icon={faBell} color="black" size={'3x'} />
      {props.unreadCount > 0 && (
        <div
          className={
            "notification-badge" + (props.unreadCount > 9 ? " plus" : "")
          }
        >
          {props.unreadCount < 10 ? props.unreadCount : "9+"}
        </div>
      )}
      </div>
      <Popover
        open={props.opened}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        onRequestClose={props.handleToggle}
      >
        <NotificationInner {...props} />
      </Popover>
    </div>
 }
}

export default NotificationElement
