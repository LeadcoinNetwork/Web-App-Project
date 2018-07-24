import React from "react"

const SocialLogin = ({ connectWithText, provider }) => (
  <a
    className="ldc-social-login"
    href={`${process.env.BACKEND}/auth/${provider}?state=${encodeURIComponent(
      process.env.FRONTEND,
    )}`}
  >
    <i className={`fab fa-${provider}`} />
    {connectWithText} {provider}
  </a>
)

export default SocialLogin
