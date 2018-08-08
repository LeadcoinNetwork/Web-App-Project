import React from "react"
import { Link } from "react-router-dom"
import * as _ from "lodash"
import BalanceWidget from "../BalanceWidget"
import NotificationElement from "../NotificationElement"
import UserMenu from "../UserMenu"
import LanguageSelector from "../LanguageSelector"
import t from "../../utils/translate/translate"
import { connect } from "react-redux"
import * as actions from "actions"
import { Route, Switch } from "react-router"
const Header = ({
  pathname,
  loggedIn,
  disabled,
  logout,
  gotoDefaultHome,
  language,
}) => {
  return (
    <header
      className={`ldc-header${
        loggedIn && !disabled ? " h-app-mode" : " h-sign-mode"
      }`}
    >
      <div className="logo">
        <span className="logo-link" onClick={gotoDefaultHome} />
        <span className="alpha-demo">DEMO</span>
      </div>
      {/* 
      uncomment bring back the language selector
      <div className="m-both-right">
        <LanguageSelector />
      </div> */}

      {disabled && (
        <div className="sign-link">
          <Link to="/login" onClick={logout}>
            {t("Logout")}
          </Link>
        </div>
      )}
      {!disabled &&
        pathname == "/login" && (
          <div className="sign-link">
            <span>{t("don't have an account?")}</span>
            <Link className="no-underline" to="/signup">
              {t("Register")}
            </Link>
          </div>
        )}
      {!disabled &&
        pathname != "/login" && (
          <div className="sign-link">
            <span>{t("already have an account?")}</span>
            <Link className="no-underline" to="/login">
              {t("Login Here")}
            </Link>
          </div>
        )}

      <div className="ham-menu">
        <BalanceWidget language={language} />
        <NotificationElement />
        <UserMenu />
      </div>
    </header>
  )
}

var mapStateToProps = state => ({
  loggedIn: !!_.get(state, "user.id"),
  disabled: !!_.get(state, "user.disabled"),
  pathname: _.get(state, "router.location.pathname"),
  language: state.language,
})
var mapDispatchToProps = {
  gotoDefaultHome: actions.route.gotoDefaultHome,
  logout: actions.user.logOut,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
