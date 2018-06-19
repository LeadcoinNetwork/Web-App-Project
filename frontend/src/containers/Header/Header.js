import React from "react"
import { Link } from "react-router-dom"
import NotificationElement from "Containers/NotificationElement"
import UserMenu from "Containers/UserMenu"

const Header = ({ path, loggedIn }) => (
  <header className={`ldc-header${loggedIn ? " h-app-mode" : " h-sign-mode"}`}>
    <Link to="/" className="logo-link" />
    {path === "/login" ? (
      <div className="sign-link">
        <span>already have an account?</span>
        <Link to="/signup">Start Now</Link>
      </div>
    ) : (
      <div className="sign-link">
        <span>don't have an account?</span>
        <Link to="/login">Login Here</Link>
      </div>
    )}
    <div className="ham-menu">
      <NotificationElement />
      <UserMenu />
    </div>
  </header>
)

export default Header
