import * as React from 'react';
import MaterialButton from 'material-ui/RaisedButton';

export interface IButton {
  type?: string;
  onClick?: React.MouseEventHandler<{}>;
  children?: any;
}

const Button = ({
  type,
  onClick,
  children
}:IButton) => (
  <MaterialButton
    children={children}
    type={type}
    onClick={onClick}
    />
);

export default Button;