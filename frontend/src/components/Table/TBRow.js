import React from "react";
import Checkbox from "Components/Checkbox";
import Button from "Components/Button";
import TBRCol from "./TBRCol";

const TBRow = props => (
  <div className="tb-row" onClick={() => props.toggleRecord(props.id)}>
    <div className="tbr-checkbox">
      <Checkbox checked={props.selectedRecords.has(props.id)} />
    </div>
    <div className="tbr-buttons">
      {props.buttons.map(button => (
        <Button
          key={button.value}
          label={button.value}
          onClick={() => button.onClick(props.id)}
        />
      ))}
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
