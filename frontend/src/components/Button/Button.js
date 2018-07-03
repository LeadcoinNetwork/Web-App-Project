import React from "react"
import t from "Containers/translate"

const Button = ({
  type,
  disabled,
  label,
  loadingLabel = t("Wait"),
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
      {loading ? loadingLabel : label}
      {children}
    </button>
  )
}

export default Button
