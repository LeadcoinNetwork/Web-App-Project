import React from "react"
import { Link } from "react-router-dom"
import BalanceWidget from "Containers/BalanceWidget"
import NotificationElement from "Containers/NotificationElement"
import UserMenu from "Containers/UserMenu"
import LanguageSelector from "Containers/LanguageSelector"

const Header = ({ path, loggedIn, disabled, logout, gotoDefaultHome }) => (
  <header
    className={`ldc-header${
      loggedIn && !disabled ? " h-app-mode" : " h-sign-mode"
    }`}
  >
    <div className="logo-link" onClick={gotoDefaultHome} />
    <div className="right-menu">
      {!loggedIn &&
        (disabled ? (
          <div className="sign-link">
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          </div>
        ) : path === "/login" ? (
          <div className="sign-link">
            <span>already have an account?</span>
            <Link to="/signup">Start Now</Link>
          </div>
        ) : (
          <div className="sign-link">
            <span>don't have an account?</span>
            <Link to="/login">Login Here</Link>
          </div>
        ))}

      <div className="ham-menu">
        {loggedIn && (
          <span>
            <BalanceWidget />
            <NotificationElement />
            <UserMenu />
          </span>
        )}
        <LanguageSelector />
      </div>
    </div>
  </header>
)

export default Header
