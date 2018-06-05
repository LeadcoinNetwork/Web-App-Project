import React from "react";
import MaterialButton from "material-ui/RaisedButton";

const Button = ({
  type,
  onClick,
  children,
  label,
  containerElement,
  disabled
}) => (
  <MaterialButton
    children={children}
    type={type}
    label={label}
    onClick={onClick}
    containerElement={containerElement}
    disabled={disabled}
  />
);

export default Button;
