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
      className={`ldc-textfield${appStyle ? " t-app-style" : ""}${
        className ? " " + className : ""
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
