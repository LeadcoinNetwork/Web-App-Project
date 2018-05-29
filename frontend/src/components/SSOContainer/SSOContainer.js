import React from 'react';;
import GoogleLogin from 'Components/GoogleLogin';
import LinkedinLogin from 'Components/LinkedinLogin';

class SSOContainer extends React.Component {
  render() {
    return (
      <div className="external_login_container">
        <GoogleLogin />
        <LinkedinLogin />
      </div>
    )
  }
}

export default SSOContainer;
