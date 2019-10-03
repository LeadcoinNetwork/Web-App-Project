import React from "react"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import faSortUp from "@fortawesome/fontawesome-free-solid/faSortUp"
import faSortDown from "@fortawesome/fontawesome-free-solid/faSortDown"

const THRCol = ({ field, colCount, staticColsWidth, onSort, sortedBy }) => (
  <div
    key={field.name}
    className="thr-col"
    data-for="field-tooltip"
    data-tip={field.tooltip}
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
              !sortedBy ||
              String(sortedBy.key).toLowerCase() !==
                String(field.key).toLowerCase()
                ? "asc"
                : sortedBy.direction === "asc"
                  ? "desc"
                  : "asc",
              field.key,
            )
        : undefined
    }
  >
    {field.name}
    {sortedBy &&
      String(sortedBy.key).toLowerCase() ===
        String(field.key).toLowerCase() && (
        <FontAwesomeIcon
          icon={sortedBy.direction === "asc" ? faSortUp : faSortDown}
        />
      )}
  </div>
)

export default THRCol
