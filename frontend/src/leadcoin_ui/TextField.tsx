import * as React from 'react';
import MaterialTextField from 'material-ui/TextField';

export interface ITextField {
  label?: string;
  value?: string | number;
  onChange?(e: React.FormEvent<{}>, newValue: string): void;
  fullWidth?: boolean;
  type?: string;
}

const TextField = ({
  label,
  value,
  type,
  fullWidth,
  onChange,
}:ITextField) => (
  <MaterialTextField
    value={value}
    type={type}
    floatingLabelText={label}
    fullWidth={fullWidth}
    onChange={onChange}
    />
);

export default TextField;