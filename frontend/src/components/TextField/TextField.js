import React from "react"
import MaterialTextField from "material-ui/TextField"

const TextField = ({
  label,
  hintText,
  value,
  type,
  fullWidth,
  onChange,
}) => (
  <MaterialTextField
    value={value}
    type={type}
    floatingLabelText={label}
    hintText={hintText}
    fullWidth={fullWidth}
    onChange={onChange}
  />
)

export default TextField
