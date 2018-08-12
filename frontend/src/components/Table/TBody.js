import React from "react"
import TBRow from "./TBRow"
import { priceString } from "../../utils/numbers"
import * as moment from "moment"

const TBody = props => (
  <div className="t-body">
    {props.records
      .map(r => ({
        ...r,
        date: moment(r.date).format("DD-MM-YY"),
        price: r.price ? priceString(r.price) : undefined,
        lead_price: r.lead_price ? priceString(r.lead_price) : undefined,
      }))
      .map(r => <TBRow key={r.id} {...r} {...props} />)}
    {props.records.length === 0 ? props.showOnZeroRecords : null}
  </div>
)

export default TBody
