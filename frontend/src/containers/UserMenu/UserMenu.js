import React from "react"
import { connect } from "react-redux"

function UserMenu(props) {
  return (
    <div
      onClick={() => {
        props.dispatch({ type: "abc" })
      }}
    >
      User Menu
    </div>
  )
}

export default connect()(UserMenu)
