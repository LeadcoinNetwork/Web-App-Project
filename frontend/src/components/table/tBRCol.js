import React from "react"
import { localeString } from "../../utils/time"

const TBRCol = ({ field, value, colCount, staticColsWidth }) => (
  <div
    className="tbr-col"
    style={{
      width: `calc((100% - ${staticColsWidth}px) / ${colCount})`,
      maxWidth: field.maxWidth,
      minWidth: field.minWidth,
    }}
  >
    {field.key === "timestamp" ? localeString(value) : value}
  </div>
)

export default TBRCol
