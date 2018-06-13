import React from "react"

const SocialLogin = ({ provider }) => (
  <a
    className="ldc-social-login"
    href={`${process.env.BACKEND}/auth/${provider}`}
  >
    <i className={`fab fa-${provider}`} />
    connect with {provider}
  </a>
)

export default SocialLogin
