import React from 'react';
import Button from '../leadcoin_ui/Button';

class GoogleLogin extends React.Component {
  loginGoogle() {
    window.open('http://127.0.0.1.xip.io:3000/api/v1/auth/google', '_top')
  }

  render() {
    return (
      <div className="external_login_container">
        <div> <Button onClick={this.loginGoogle}> Google </Button> </div>
      </div>
    )
  }
}

export default GoogleLogin;
