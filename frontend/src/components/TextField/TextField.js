import React from "react"

const TextField = ({
  placeholder,
  name,
  value,
  type,
  onChange,
  appStyle,
  inverted,
}) => {
  appStyle = appStyle || inverted
  return (
    <input
      className={`ldc-textfield${appStyle ? " t-app-style" : ""}`}
      name={name}
      value={value}
      type={type || "text"}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default TextField
