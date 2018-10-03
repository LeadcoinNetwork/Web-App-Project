import React from "react"

const TextField = ({
  className,
  placeholder,
  name,
  value,
  type,
  onChange,
  appStyle,
  disabeld,
}) => {
  return (
    <input
      className={`ldc-textfield${className ? " " + className : ""}${
        appStyle ? " t-app-style" : ""
      }`}
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
