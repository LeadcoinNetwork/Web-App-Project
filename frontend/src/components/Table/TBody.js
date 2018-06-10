import React from "react"
import TBRow from "./TBRow"

const TBody = props => (
  <div className="t-body">
    {props.records.map(r => <TBRow key={r.id} {...r} {...props} />)}
    {props.records.length ? props.showOnZeroRecords : null}
  </div>
)

export default TBody
