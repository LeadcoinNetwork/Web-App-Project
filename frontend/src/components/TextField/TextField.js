import React from "react"

const TextField = ({ placeholder, name, value, type, onChange, inverted, disabled }) => {
  let clsName = "ldc-textfield " + ((inverted) ? "inverted" : "")
  return (
    <input
      className={clsName}
      disabled={disabled}
      name={name}
      value={value}
      type={type || "text"}
      placeholder={placeholder}
      onChange={onChange}
    />)
}

export default TextField
