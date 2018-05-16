import * as React from 'react';
import MaterialCheckbox from 'material-ui/Checkbox';
import { CheckboxProps } from 'material-ui';

const Checkbox = (props:CheckboxProps) => (

  <MaterialCheckbox 
    {...props}
    onCheck={props.onChange} 
    />
);

export default Checkbox;