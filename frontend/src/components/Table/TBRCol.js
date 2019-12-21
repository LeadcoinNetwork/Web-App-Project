import React from "react"
import { localeString } from "Utils/time"

const fieldsTooltips = ["functionality", "languages", "comments"]

const TBRCol = ({ field, value, colCount, staticColsWidth }) => {
  const renderValue = () => {
    if (field.key === "auction" && value === true) {
      return <i className="fas fa-gavel" />
    }
    return field.key === "timestamp" ? localeString(value) : value
  }

  return (
    <div
      data-for="field-tooltip"
      data-tip={fieldsTooltips.includes(field.key) ? value : null}
      className="tbr-col"
      style={{
        width: `calc((100% - ${staticColsWidth}px) / ${colCount})`,
        maxWidth: field.maxWidth,
        minWidth: field.minWidth,
      }}
    >
      {renderValue()}
    </div>
  )
}

export default TBRCol
