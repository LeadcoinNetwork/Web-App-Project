import * as React from 'react';
import MaterialCheckbox from 'material-ui/Checkbox';
import { CheckboxProps } from 'material-ui';

export interface ICheckbox {
  onChange?(event: React.MouseEvent<{}>, checked: boolean): void;
  onCheck?(event: React.MouseEvent<{}>, checked: boolean): void;
  label?: string;
  checked?: boolean;
}

const Checkbox = (props:CheckboxProps) => (
  <MaterialCheckbox 
    {...props}
    onCheck={props.onChange} 
    />
);

export default Checkbox;