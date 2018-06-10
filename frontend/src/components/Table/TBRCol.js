import React from "react"

const TBRCol = ({ field, value, colCount, staticColsWidth }) => (
  <div
    className="tbr-col"
    style={{
      width: `calc((100% - ${staticColsWidth}px) / ${colCount})`,
      maxWidth: field.maxWidth,
      minWidth: field.minWidth,
    }}
  >
    {value}
  </div>
)

export default TBRCol
