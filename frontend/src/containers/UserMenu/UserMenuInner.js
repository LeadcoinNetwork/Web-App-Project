import React from "react"
import { Link } from "react-router-dom"
import t from "../../utils/translate/translate"

const UserMenuInner = ({ user, logOut }) => {
  const menuItems = [
    { title: "Settings", path: "/settings" },
    { title: "Profile", path: "/profile" },
    { title: "Transactions", path: "/transaction-history" },
    { title: "Log Out", path: "/login", onClick: logOut },
  ]

  return (
    <div className="user-menu-inner">
      <div className="small-arrow" />
      {user.email && (
        <label>
          {t("Logged in as:")}
          <span title={user.email}>{user.email}</span>
        </label>
      )}
      {menuItems.map((item, index) => (
        <Link
          to={item.path}
          className="no-underline um-row "
          key={index}
          onClick={item.onClick}
        >
          {t(item.title)}
        </Link>
      ))}
    </div>
  )
}

export default UserMenuInner
