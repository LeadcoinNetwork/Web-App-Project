import React from "react"

const TextField = ({ placeholder, name, value, type, onChange, inverted }) => {
  let clsName = "ldc-textfield " + ((inverted) ? "inverted" : "")
  return (
    <input
      className={clsName}
      name={name}
      value={value}
      type={type || "text"}
      placeholder={placeholder}
      onChange={onChange}
    />)
}

export default TextField
