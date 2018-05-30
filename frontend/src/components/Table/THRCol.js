import React from 'react';

const THRCol = ({
  field,
  colCount,
  staticColsWidth,
}) => (
  <div key={field.name}
    className='thr-col'
    style={{
      width: `calc((100% - ${staticColsWidth}px) / ${colCount})`,
      maxWidth: field.maxWidth,
      minWidth: field.minWidth,
    }}>
    {field.name}
  </div>
);

export default THRCol;