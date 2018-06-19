import React from "react"
import { Link } from "react-router-dom"

const UserMenuInner = ({
  menuItems,
  logOut,
}) => (
  <div className="user-menu-inner">
    <div className="small-arrow" />
    {menuItems.map((item, index) => (
      <div className="um-row" key={index}>
        <Link to={item.path}>{item.title}</Link>
      </div>
    ))}
    <div className="um-row" key={menuItems.length}>
      <Link to={"/"} onClick={logOut}>Log Out</Link>
    </div>
  </div>
)

export default UserMenuInner