import React from "react"
import { Link } from "react-router-dom"

const menuItems = [
  { title: "User Settings", path: "/settings" },
  { title: "Payments History", path: "/payments" },
  { title: "Withdraw Funds", path: "/withdraw" },
]

const UserMenuInner = ({ logOut }) => (
  <div className="user-menu-inner">
    <div className="small-arrow" />
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
