import React from "react"

const Button = ({
  type,
  disabled,
  label,
  loadingLabel = "Wait",
  loading,
  onClick,
  children,
  appStyle,
  isSecondary,
}) => {
  let cls = `ldc-button${loading ? " b-loading" : ""}${
    appStyle ? " b-app-style" : ""
  }${isSecondary ? " b-secondary" : ""}`

  return (
    <button
      className={cls}
      type={type || "button"}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? loadingLabel : label}
      {children}
    </button>
  )
}

export default Button
