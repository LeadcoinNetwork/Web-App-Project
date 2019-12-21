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
        startDate: r.startDate
          ? moment(r.startDate).format("DD-MM-YY hh:mm")
          : undefined,
        endDate: r.endDate
          ? moment(r.endDate).format("DD-MM-YY hh:mm")
          : undefined,
        price: r.price ? priceString(r.price) : undefined,
        lead_price: r.lead_price + " LDC",
        budget: r.budget ? priceString(Number(r.budget)) : undefined,
      }))
      .map(r => <TBRow key={r.id} {...r} {...props} />)}
    {props.records.length === 0 ? props.showOnZeroRecords : null}
  </div>
)

export default TBody
