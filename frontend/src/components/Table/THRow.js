import React from "react"
import Checkbox from "Components/Checkbox"
import THRCol from "./THRCol"

const THRow = props => (
  <div className="th-row">
    {props.isSelectable && (
      <div className="thr-checkbox">
        <Checkbox checked={props.isAllSelected} onClick={props.toggleAll} />
      </div>
    )}
    {props.fields.map(f => (
      <THRCol
        key={f.name}
        colCount={props.colCount}
        staticColsWidth={props.staticColsWidth}
        field={f}
        onSort={props.onSort}
        sortedBy={props.sortedBy}
      />
    ))}
  </div>
)

export default THRow
