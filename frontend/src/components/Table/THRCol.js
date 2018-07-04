import React from "react"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faSortUp from "@fortawesome/fontawesome-free-solid/faSortUp"
import faSortDown from "@fortawesome/fontawesome-free-solid/faSortDown"

const THRCol = ({ field, colCount, staticColsWidth, onSort, sortedBy }) => (
  <div
    key={field.name}
    className="thr-col"
    style={{
      width: `calc((100% - ${staticColsWidth}px) / ${colCount})`,
      maxWidth: field.maxWidth,
      minWidth: field.minWidth,
      fontWeight: sortedBy && sortedBy.key === field.name ? 700 : 400,
    }}
    onClick={
      field.sortable && onSort
        ? () =>
            onSort(
              field.name,
              !sortedBy || sortedBy.key !== field.name
                ? "asc"
                : sortedBy.direction === "asc" ? "desc" : "asc",
            )
        : undefined
    }
  >
    {field.name}
    {sortedBy &&
      sortedBy.key === field.name && (
        <FontAwesomeIcon
          icon={sortedBy.direction === "asc" ? faSortUp : faSortDown}
        />
      )}
  </div>
)

export default THRCol
