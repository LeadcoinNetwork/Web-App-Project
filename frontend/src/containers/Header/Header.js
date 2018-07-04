import React from "react"
import { Link } from "react-router-dom"
import BalanceWidget from "Containers/BalanceWidget"
import NotificationElement from "Containers/NotificationElement"
import UserMenu from "Containers/UserMenu"
import LanguageSelector from "Containers/LanguageSelector"
import t from "Containers/translate"

const Header = ({ path, loggedIn, disabled, logout, gotoDefaultHome }) => (
  <header
    className={`ldc-header${
      loggedIn && !disabled ? " h-app-mode" : " h-sign-mode"
    }`}
  >
    <div className="logo-link" onClick={gotoDefaultHome} />

    <div className="m-both-right">
      <LanguageSelector />
    </div>

    {disabled ? (
      <div className="sign-link">
        <Link to="/login" onClick={logout}>
          {t("Logout")}
        </Link>
      </div>
    ) : path === "/login" ? (
      <div className="sign-link">
        <span>{t("already have an account?")}</span>
        <Link to="/signup">{t("Start Now")}</Link>
      </div>
    ) : (
      <div className="sign-link">
        <span>{t("don't have an account?")}</span>
        <Link to="/login">{t("Login Here")}</Link>
      </div>
    )}

    <div className="ham-menu">
      <BalanceWidget />
      <NotificationElement />
      <UserMenu />
    </div>
  </header>
)

export default Header
