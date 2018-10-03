import React from "react"
import Checkbox from "Components/Checkbox"
import Button from "Components/Button"
import TBRCol from "./TBRCol"

class TBrowOptions extends React.Component {
  componentWillMount() {
    this.setState({ open: false })
  }
  render() {
    const { open } = this.state
    const optionsContainer = Object.keys(this.props.options).map(o => {
      console.log(o)
      let className
      switch (o) {
        case "deleteLead":
          return (
            <div
              key={o}
              className="trash"
              onClick={() => {
                this.props.options.deleteLead(this.props.outerProps.id)
              }}
            />
          )
          break
        case "editLead":
          className = "pencil"
          break
        case "displayLead":
          className = "eye"
          break
      }
      return (
        <div
          key={o}
          className={className}
          onClick={() => {
            this.props.options[o](this.props.outerProps)
          }}
        />
      )
    })
    return (
      <>
        {open && <div className="options_bar">{optionsContainer}</div>}
        <div
          className="options"
          onClick={() => {
            this.setState({ open: !open })
          }}
        />
      </>
    )
  }
}

const TBRow = props => (
  <div
    className={`tb-row
    ${props.selected && props.selected.has(props.id) ? " r-selected" : ""}
    ${props.displayLead ? " display-lead" : ""}
  `}
  >
    {props.options && (
      <TBrowOptions options={props.options} outerProps={props} />
    )}
    {props.isSelectable && (
      <div className="tbr-checkbox">
        <Checkbox
          checked={props.selected.has(props.id)}
          onClick={e => props.toggleRecord(e, props.id)}
        />
      </div>
    )}
    {props.buttons &&
      false && (
        <div className="tbr-buttons">
          {props.buttons.map(button => (
            <Button
              key={button.value}
              appStyle={true}
              label={button.value}
              onClick={e => {
                e.stopPropagation()
                button.onClick(props.id)
              }}
            />
          ))}
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
