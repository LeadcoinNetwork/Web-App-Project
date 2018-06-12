import React from "react"
import Button from "Components/Button"

const SocialLogin = ({ provider }) => (
  <Button
    onClick={() =>
      window.open(`${process.env.BACKEND}/auth/${provider}`, "_top")
    }
    label={`connect with ${provider}`}
  />
)

export default SocialLogin
