import React from "react"
import MaterialTextField from "material-ui/TextField"

const TextField = ({ label, hintText, value, type, fullWidth, onChange }) => (
  <input
    className="ldc-textfield"
    value={value}
    type={type}
    placeholder={label}
    // floatingLabelText={label}
    title={hintText}
    // fullWidth={fullWidth}
    onChange={onChange}
  />
)

export default TextField
