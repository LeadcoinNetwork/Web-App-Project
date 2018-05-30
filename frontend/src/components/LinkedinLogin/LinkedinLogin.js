import React from "react";
import Button from "Components/Button";

class LinkedinLogin extends React.Component {
  loginLI = () => {
    window.open(`${process.env.BACKEND}/api/v1/auth/linkedin`, "_top");
  };

  render() {
    return (
      <div>
        {" "}
        <Button onClick={this.loginLI}> LinkedIn </Button>{" "}
      </div>
    );
  }
}

export default LinkedinLogin;
