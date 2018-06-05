import React from "react";
import TBRow from "./TBRow";

const TBody = props => (
  <div className="t-body">
    {props.records.map(r => <TBRow key={r.id} {...r} {...props} />)}
  </div>
);

export default TBody;
