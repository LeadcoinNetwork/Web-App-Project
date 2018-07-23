import React from "react"
import Checkbox from "../Checkbox"
import Button from "../Button"
import TBRCol from "./TBRCol"

const TBRow = props => (
  <div className="tb-row">
    {props.isSelectable && (
      <div className="tbr-checkbox">
        <Checkbox
          checked={props.selected.has(props.id)}
          onClick={e => props.toggleRecord(e, props.id)}
        />
      </div>
    )}
    {props.buttons && (
      <div className="tbr-buttons">
        {props.buttons.map(
          button =>
            button.value === "buy" ? (
              <span
                key={button.value}
                className="tbrb-buy"
                onClick={e => {
                  e.stopPropagation()
                  button.onClick(props.id)
                }}
              />
            ) : (
              <Button
                key={button.value}
                appStyle={true}
                label={button.value}
                onClick={e => {
                  e.stopPropagation()
                  button.onClick(props.id)
                }}
              />
            ),
        )}
      </div>
    )}
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
)

export default TBRow
