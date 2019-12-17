import React from "react"

const Textarea = ({
  name,
  value,
  placeholder,
  rows = 7,
  onChange,
  maxLength,
}) => (
  <textarea
    className="ldc-textarea"
    name={name}
    value={value}
    placeholder={placeholder}
    rows={rows}
    onChange={onChange}
    maxLength={maxLength}
  />
)

export default Textarea
