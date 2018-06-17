import React from "react"

const Button = ({
  type,
  disabled,
  label,
  loadingLabel = "Wait",
  loading,
  onClick,
}) => (
  <button
    className={`ldc-button${loading ? " b-loading" : ""}`}
    type={type || "button"}
    disabled={disabled || loading}
    onClick={onClick}
  >
    {loading ? loadingLabel : label}
  </button>
)

export default Button
