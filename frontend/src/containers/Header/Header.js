import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class Header extends React.Component {
  render() {
    let path = this.props.location.pathname

    return (
      <header className="ldc-header">
        <Link to="/" className="logo-link" />
        {path === "/login" ? (
          <div className="sign-link">
            already have an account?
            <Link to="/signup">Start Now}</Link>
          </div>
        ) : (
          <div className="sign-link">
            don't have an account?
            <Link to="/login">Login Here}</Link>
          </div>
        )}
      </header>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  location: state.routerReducer.location,
})

export default connect(mapStateToProps)(Header)
