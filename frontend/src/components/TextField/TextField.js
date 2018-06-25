import React from "react"

const TextField = ({
  placeholder,
  name,
  value,
  type,
  onChange,
  appStyle,
  inverted,
  disabeld,
}) => {
  appStyle = appStyle || inverted
  return (
    <input
      className={`ldc-textfield${appStyle ? " t-app-style" : ""}`}
      name={name}
      value={value}
      disabled={disabeld}
      type={type || "text"}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default TextField
