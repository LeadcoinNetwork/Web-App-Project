import React from "react"

const Checkbox = ({ name, label, checked, onClick, id, onChange }) => (
  <label className="ldc-checkbox">
    <input
      id={id}
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onClick ? onClick : onChange}
    />
    <span />
    {label}
  </label>
)

export default Checkbox
