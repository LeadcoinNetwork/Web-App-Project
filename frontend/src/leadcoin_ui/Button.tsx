import * as React from 'react';
import MaterialButton from 'material-ui/RaisedButton';

export interface IButton {
  type?: string;
  onClick?: React.MouseEventHandler<{}>;
}

const Button = ({
  type,
  onClick
}:IButton) => (
  <MaterialButton
    type={type}
    onClick={onClick}
    />
);

export default Button;