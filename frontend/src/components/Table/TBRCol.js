import React from "react"
import { localeString } from "Utils/time"

const TBRCol = ({ field, value, colCount, staticColsWidth }) => (
  <div
    data-for="field-tooltip"
    data-tip={
      field.key === "functionality" || field.key === "languages" ? value : null
    }
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
