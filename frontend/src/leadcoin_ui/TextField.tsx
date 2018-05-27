import * as React from 'react';
import MaterialTextField from 'material-ui/TextField';

export interface ITextField {
  label?: string;
  value?: string | number;
  onChange?(e: React.FormEvent<{}>, newValue: string): void;
  fullWidth?: boolean;
  type?: string;
  hintText?: string;
  floatingLabelText?: string;
}

const TextField = ({
  label,
  hintText,
  value,
  type,
  fullWidth,
  onChange,
}:ITextField) => (
  <MaterialTextField
    value={value}
    type={type}
    floatingLabelText={label}
    hintText={hintText}
    fullWidth={fullWidth}
    onChange={onChange}
    />
);

export default TextField;