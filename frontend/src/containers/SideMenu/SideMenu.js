import React from "react"
import { Link } from "react-router-dom"
import t from "../../utils/translate/translate"

const SideMenu = ({ path }) => {
  return (
    <nav className="ldc-side-menu">
      <Link
        to="/buy-leads"
        className={path === "/buy-leads" ? "sm-active" : ""}
        data-text={t("buy leads")}
      >
        <i className="fas fa-cart-plus" />
      </Link>
      <Link
        to="/sell-leads"
        className={path === "/sell-leads" ? "sm-active" : ""}
        data-text={t("sell leads")}
      >
        <i className="fas fa-coins" />
      </Link>
      <Link
        to="/my-leads"
        className={path === "/my-leads" ? "sm-active" : ""}
        data-text={t("my leads")}
      >
        <i className="fas fa-clipboard-list" />
      </Link>
      <Link
        to="/add-lead"
        className={path === "/add-lead" ? "sm-active" : ""}
        data-text={t("add lead")}
      >
        <i className="fas fa-plus" />
      </Link>
    </nav>
  )
}

export default SideMenu
