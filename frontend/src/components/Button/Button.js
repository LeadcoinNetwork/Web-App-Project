import React from "react"

const Button = ({ type, disabled, label, loadingLabel, loading, onClick }) => (
  <button
    className="ldc-button"
    type={type || "button"}
    disabled={disabled}
    onClick={onClick}
  >
    {loading ? loadingLabel : label}
  </button>
)

export default Button
