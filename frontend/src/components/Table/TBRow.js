import React from "react";
import Checkbox from "Components/Checkbox";
import Button from "Components/Button";
import TBRCol from "./TBRCol";

const TBRow = props => (
  <div className="tb-row" onClick={e => props.toggleRecord(e, props.id)}>
    <div className="tbr-checkbox">
      <Checkbox checked={props.selectedRecords.has(props.id)} />
    </div>
    <div className="tbr-buttons">
      {props.recordMainButton ? (
        <Button
          label={props.recordMainButton}
          onClick={() => props.recordMainAction(props.id)}
        />
      ) : null}
    </div>
    {props.fields.map(f => (
      <TBRCol
        key={f.key}
        colCount={props.colCount}
        staticColsWidth={props.staticColsWidth}
        field={f}
        value={props[f.key]}
      />
    ))}
  </div>
);

export default TBRow;
