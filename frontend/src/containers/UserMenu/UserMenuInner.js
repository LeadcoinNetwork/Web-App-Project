import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

const menuItems = [
  { title: "User Settings", path: "/user-settings" },
  { title: "Payments History", path: "/payments" },
  { title: "Withdraw Funds", path: "/withdraw" },
]

const UserMenuInner = ({ user, logOut }) => (
  <div className="user-menu-inner">
    <div className="small-arrow" />
    {user.email && (
      <label>
        Logged in as:
        <span title={user.email}>{user.email}</span>
      </label>
    )}
    {menuItems.map((item, index) => (
      <Link to={item.path} className="um-row" key={index}>
        {item.title}
      </Link>
    ))}
    <Link
      to={"/"}
      onClick={logOut}
      className="um-row log-out"
      key={menuItems.length}
    >
      Log Out
    </Link>
  </div>
)

export default UserMenuInner
