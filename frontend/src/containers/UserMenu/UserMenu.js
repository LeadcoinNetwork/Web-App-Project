import React from "react"
import { connect } from "react-redux"
import { userMenu, user } from "../../actions"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faUserCircle from "@fortawesome/fontawesome-free-solid/faUserCircle"
import UserMenuInner from "./UserMenuInner";

const menuItems = [
  { title: 'User Settings', path: '/settings' },
  { title: 'Payments History', path: '/payments' },
  { title: 'Withdraw Funds', path: '/withdraw' },
]

const UserMenu = ({
  isOpen,
  userMenuClick,
  logOut,
}) => (
  <div className="user-menu" onClick={userMenuClick}>
    <FontAwesomeIcon
      className="user-icon"
      icon={faUserCircle}
      color="white"
      size={"2x"}
    />
    {isOpen && <UserMenuInner logOut={logOut} />}
    </div>
)

const mapStateToProps = state => state.userMenu

const mapDispatchToProps = {
  userMenuClick: userMenu.userMenuClick,
  logOut: user.loggedOut,
}

const UserMenuConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserMenu)

export default UserMenuConnected
