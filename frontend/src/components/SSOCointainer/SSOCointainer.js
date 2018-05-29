import React from 'react';
import GoogleLogin from './GoogleLogin'
import LILogin from './LILogin'

class SSOContainer extends React.Component {
  render() {
    return (
      <div className="external_login_container">
        <GoogleLogin />
        <LILogin />
      </div>
    )
  }
}

export default SSOCointainer;
