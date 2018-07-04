import React from "react"

const Button = ({
  type,
  disabled,
  label,
  loadingLabel,
  loading,
  onClick,
  children,
  appStyle,
  secondary,
}) => {
  let cls = `ldc-button${loading ? " b-loading" : ""}${
    appStyle ? " b-app-style" : ""
  }${secondary ? " b-secondary" : ""}`

  return (
    <button
      className={cls}
      type={type || "button"}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && loadingLabel ? loadingLabel : label}
      {children}
    </button>
  )
}

export default Button
