import React from "react"

const Checkbox = ({ name, label, checked, onClick }) => (
  <label className="ldc-checkbox">
    <input type="checkbox" name={name} checked={checked} onChange={onClick} />
    <span />
    {label}
  </label>
)

export default Checkbox
