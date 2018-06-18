import React from "react"
import { connect } from "react-redux"
import { types } from "actions"

function UserMenu(props) {
  return (
    <div
      className="click-handler"
      onClick={() => {
        props.dispatch({ type: types.USER_MENU_OPEN })
      }}
    >
      User Menu
    </div>
  )
}

export default connect()(UserMenu)
