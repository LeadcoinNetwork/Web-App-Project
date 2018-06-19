import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import NotificationElement from "Containers/NotificationElement"

class Header extends React.Component {
  render() {
    let path = this.props.location.pathname

    return (
      <header
        className={`ldc-header${
          this.props.loggedIn ? " h-app-mode" : " h-sign-mode"
        }`}
      >
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
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  location: state.routerReducer.location,
})

export default connect(mapStateToProps)(Header)
