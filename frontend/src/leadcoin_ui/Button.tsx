import * as React from 'react';
import MaterialButton from 'material-ui/RaisedButton';
import { RaisedButtonProps } from 'material-ui';

const Button = (props:RaisedButtonProps) => (
  <MaterialButton {...props} />
);

export default Button;