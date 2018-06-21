import React from "react"

const Button = ({
  type,
  disabled,
  label,
  loadingLabel = "Wait",
  className,
  loading,
  onClick,
  children,
}) => (
  <button
    className={className+` ldc-button${loading ? " b-loading" : ""}`}
    type={type || "button"}
    disabled={disabled || loading}
    onClick={onClick}
  >
    {loading ? loadingLabel : label}
    {children}
  </button>
)

export default Button
