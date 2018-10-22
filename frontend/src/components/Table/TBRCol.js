import React from "react"
import { localeString } from "../../utils/time"
import { priceString, areaSpanEl } from "../../utils/numbers"

const TBRCol = ({ field, value, colCount, staticColsWidth }) => {
  return (
    <div
      className="tbr-col"
      style={{
        width: `calc((100% - ${staticColsWidth}px) / ${colCount})`,
        maxWidth: field.maxWidth,
        minWidth: field.minWidth,
      }}
    >
      {field.key === "timestamp"
        ? localeString(value)
        : field.key === "Price" || field.key === "lead_price"
          ? priceString(value)
          : field.key === "Size"
            ? areaSpanEl(value)
            : value}
    </div>
  )
}

export default TBRCol
