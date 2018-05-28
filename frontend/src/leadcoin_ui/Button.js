import * as React from 'react';
import MaterialButton from 'material-ui/RaisedButton';

const Button = ({
  type,
  onClick,
  children,
  label,
  containerElement
}) => (
  <MaterialButton
    children={children}
    type={type}
    label={label}
    onClick={onClick}
    containerElement = {containerElement}
    />
);

export default Button;