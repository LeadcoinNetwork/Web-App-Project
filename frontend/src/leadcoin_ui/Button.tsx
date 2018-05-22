import * as React from 'react';
import MaterialButton from 'material-ui/RaisedButton';

export interface IButton {
  type?: string;
  onClick?: React.MouseEventHandler<{}>;
  children?: any;
  containerElement?: React.ReactNode | string;
  label?: React.ReactNode;
}

const Button = ({
  type,
  onClick,
  children,
  label,
  containerElement
}:IButton) => (
  <MaterialButton
    children={children}
    type={type}
    label={label}
    onClick={onClick}
    containerElement = {containerElement}
    />
);

export default Button;