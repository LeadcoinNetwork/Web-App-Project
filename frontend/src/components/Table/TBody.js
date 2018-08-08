import React from "react"
import TBRow from "./TBRow"
import { priceString } from "../../utils/numbers"

const TBody = props => (
  <div className="t-body">
    {props.records
      .map(r => ({
        ...r,
        price: r.price ? priceString(r.price) : undefined,
        lead_price: r.lead_price ? priceString(r.lead_price) : undefined,
      }))
      .map(r => <TBRow key={r.id} {...r} {...props} />)}
    {props.records.length === 0 ? props.showOnZeroRecords : null}
  </div>
)

export default TBody
