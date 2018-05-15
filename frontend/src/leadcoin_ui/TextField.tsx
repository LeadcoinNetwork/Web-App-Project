import * as React from 'react';
import MaterialTextField from 'material-ui/TextField';
import { TextFieldProps } from 'material-ui';

export interface wrapperInterface extends TextFieldProps{
  label: string;
}

/** ID is for material-ui. They need it... */
let counter = 0;

class TextField extends React.Component <wrapperInterface>  {
  constructor(props:wrapperInterface){
    super(props);
    counter++;
  }
  render(){
    return (
      <MaterialTextField 
        id={"text-field-id" + counter}
        floatingLabelText={this.props.label}
        {...this.props}
        />
    );
  }
};

export default TextField;