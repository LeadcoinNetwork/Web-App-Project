import React, { Component } from "react"
import { connect } from "react-redux"
import { userMenu, user } from "../../actions"
import UserMenuInner from "./UserMenuInner"

class UserMenu extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    if (this.props.isOpen) {
      this.props.userMenuClick()
    }
  }

  componentDidMount() {
    window.addEventListener("click", this.handleClick)
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClick)
  }

  render() {
    let { userMenu, user, userMenuClick, logOut } = this.props
    return (
      <div
        className="ldc-user-menu fas fa-user-circle"
        onClick={e => {
          e.stopPropagation()
          userMenuClick()
        }}
      >
        {userMenu.isOpen && <UserMenuInner user={user} logOut={logOut} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userMenu: state.userMenu,
  user: state.user,
})

const UserMenuConnected = connect(mapStateToProps, {
  userMenuClick: userMenu.userMenuClick,
  logOut: user.loggedOut,
})(UserMenu)

export default UserMenuConnected
