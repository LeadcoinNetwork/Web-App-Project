import React from 'react';
import THRCol from './THRCol';

const THRow = props => (
  <div className='th-row'>
    {
      props.fields.map(f => (
        <THRCol key={f.name}
          colCount={props.colCount}
          staticColsWidth={props.staticColsWidth}
          field={f}
        />
      ))
    }
  </div>
);

export default THRow;