import React from "react";

const THRCol = ({ field, colCount, staticColsWidth, onSort }) => (
  <div
    key={field.name}
    className="thr-col"
    style={{
      width: `calc((100% - ${staticColsWidth}px) / ${colCount})`,
      maxWidth: field.maxWidth,
      minWidth: field.minWidth
    }}
    onClick={field.sortable && onSort ? () => onSort(field.name) : undefined}
  >
    {field.name}
  </div>
);

export default THRCol;
