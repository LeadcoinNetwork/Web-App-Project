import React from "react"
import TBRow from "./tBRow"

const TBody = props => (
  <div className="t-body">
    {props.records.map(r => <TBRow key={r.id} {...r} {...props} />)}
    {props.records.length === 0 ? props.showOnZeroRecords : null}
  </div>
)

export default TBody
