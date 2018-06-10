import React from "react"
import Button from "Components/Button"

class LinkedinLogin extends React.Component {
  loginLI = () => {
    window.open(`${process.env.BACKEND}/auth/linkedin`, "_top")
  }

  render() {
    return (
      <div>
        {" "}
        <Button onClick={this.loginLI}> LinkedIn </Button>{" "}
      </div>
    )
  }
}

export default LinkedinLogin
