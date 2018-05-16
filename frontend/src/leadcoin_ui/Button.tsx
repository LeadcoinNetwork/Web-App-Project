import * as React from 'react';
import MaterialButton from 'material-ui/RaisedButton';

export interface IButton {
  type?: string;
  onClick?: React.MouseEventHandler<{}>;
}

const Button = (props:IButton) => (
  <MaterialButton {...props} />
);

export default Button;