import React from 'react';
import Button from 'Components/Button';

class LinkedinLogin extends React.Component {
  loginLI = () => {
    window.open('http://127.0.0.1.xip.io:3000/api/v1/auth/linkedin', '_top')
  }

  render() {
    return (
      <div> <Button onClick={this.loginLI}> LinkedIn </Button> </div>
    )
  }
}

export default LinkedinLogin;
