import * as React from 'react';
import MaterialCheckbox from 'material-ui/Checkbox';

export interface ICheckbox {
  onClick?(value:boolean):void;
  label?: string;
  checked?: boolean;
} 

const Checkbox= (props:ICheckbox) => (
  <MaterialCheckbox 
    label={props.label}
    checked={props.checked}
    onCheck={(e:React.MouseEvent<HTMLInputElement>) => {
      if (props.onClick) {
        props.onClick(e.currentTarget.checked);
      }
    }} 
    />
);

export default Checkbox;