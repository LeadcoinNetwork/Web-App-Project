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
            <span>already have an account?</span>
            <Link to="/signup">Start Now</Link>
          </div>
        ) : (
          <div className="sign-link">
            <span>don't have an account?</span>
            <Link to="/login">Login Here</Link>
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
