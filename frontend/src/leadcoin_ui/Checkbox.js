import * as React from 'react';
import MaterialCheckbox from 'material-ui/Checkbox';

const Checkbox= props => (
  <MaterialCheckbox 
    label={props.label}
    checked={props.checked}
    onCheck={e => {
      if (props.onClick) {
        props.onClick(e.currentTarget.checked);
      }
    }} 
    />
);

export default Checkbox;