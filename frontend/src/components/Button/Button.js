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
}) => {
  return (
    <button
      className={`ldc-button${loading ? " b-loading" : ""}${
        appStyle ? " b-app-style" : ""
      }`}
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
