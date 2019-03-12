import React from "react"
import { Link } from "react-router-dom"
var get = require("lodash/get")
import BalanceWidget from "../BalanceWidget"
import NotificationElement from "../NotificationElement"
import UserMenu from "../UserMenu"
import LanguageSelector from "../LanguageSelector"
import t from "../../utils/translate/translate"
import { connect } from "react-redux"
import * as actions from "actions"
import { Route, Switch } from "react-router"
import ReactTooltip from 'react-tooltip'

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
      </div>
      <span className="alpha-demo">DEMO</span>
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
      <ReactTooltip className="balance-tooltip" id="balance-tooltip"  effect="solid" getContent={dataTip => dataTip} />
    </header>
  )
}

var mapStateToProps = state => ({
  loggedIn: !!get(state, "user.id"),
  disabled: !!get(state, "user.disabled"),
  pathname: get(state, "router.location.pathname"),
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
