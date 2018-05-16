import * as React from 'react';
import MaterialTextField from 'material-ui/TextField';

export interface WrapperInterface {
  label?: string;
  id?: string;
  className?: string;
  value?: string | number;
  onChange?(e: React.FormEvent<{}>, newValue: string): void;
  fullWidth?: boolean;
  type?: string;
}

/** ID is for material-ui. They need it... */
let counter = 0;

class TextField extends React.Component <WrapperInterface>  {
  constructor(props:WrapperInterface){
    super(props);
    counter++;
  }
  render(){
    let { props } = this;

    return (
      <MaterialTextField 
        id={props.id || "text-field-id" + counter}
        floatingLabelText={props.label}
        {...props}
        />
    );
  }
};

export default TextField;