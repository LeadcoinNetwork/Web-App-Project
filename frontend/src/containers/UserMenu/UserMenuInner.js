import React from "react"
import { Link } from "react-router-dom"
import t from "../../utils/translate/translate"

const menuItems = [
  { title: "Payments History", path: "/payments" },
  { title: "Withdraw Funds", path: "/withdraw" },
  { title: "User Settings", path: "/user-settings" },
]

const UserMenuInner = ({ user, logOut }) => (
  <div className="user-menu-inner">
    <div className="small-arrow" />
    {user.email && (
      <label>
        {t("Logged in as:")}
        <span title={user.email}>{user.email}</span>
      </label>
    )}
    {menuItems.map((item, index) => (
      <Link to={item.path} className="um-row" key={index}>
        {t(item.title)}
      </Link>
    ))}
    <Link
      to={"/"}
      onClick={logOut}
      className="um-row log-out"
      key={menuItems.length}
    >
      {t("Log Out")}
    </Link>
  </div>
)

export default UserMenuInner
