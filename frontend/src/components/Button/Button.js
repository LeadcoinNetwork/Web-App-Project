import React from "react"

const Button = ({
  type,
  disabled,
  label,
  loadingLabel = "Wait",
  className = "",
  loading,
  onClick,
  children,
  inverted,
}) => {
  let clsName = className || 'ldc-button'
  clsName += (loading) ? " b-loading" : ""
  clsName += (inverted) ? " inverted" : ""
  return (
  <button
    className={clsName}
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
