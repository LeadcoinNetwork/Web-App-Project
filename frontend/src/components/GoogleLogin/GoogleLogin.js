import React from "react";
import Button from "Components/Button";

class GoogleLogin extends React.Component {
  loginGoogle() {
    window.open(`${process.env.BACKEND}/auth/google`, "_top");
  }

  render() {
    return (
      <div className="external_login_container">
        <div>
          {" "}
          <Button onClick={this.loginGoogle}> Google </Button>{" "}
        </div>
      </div>
    );
  }
}

export default GoogleLogin;
