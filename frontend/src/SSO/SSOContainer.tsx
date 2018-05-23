import * as React from 'react'
import GoogleLogin from './GoogleLogin'
import LILogin from './LILogin'

export default class SSOContainer extends React.Component {
  render() {
    return (
      <div className="external_login_container">
        <GoogleLogin />
        <LILogin />
      </div>
    )
  }
}