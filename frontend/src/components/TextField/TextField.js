import React from "react"

const TextField = ({ placeholder, value, type, onChange }) => (
  <input
    className="ldc-textfield"
    value={value}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
  />
)

export default TextField
