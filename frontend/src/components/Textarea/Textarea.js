import React from "react"

const Textarea = ({ name, value, placeholder, rows = 20, onChange }) => (
  <textarea
    className="ldc-textarea"
    name={name}
    value={value}
    placeholder={placeholder}
    rows={rows}
    onChange={onChange}
  />
)

export default Textarea
