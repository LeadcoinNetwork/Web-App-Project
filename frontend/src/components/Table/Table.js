import React from "react"
import withInfiniteScroll from "HOC/withInfiniteScroll"
import Button from "Components/Button"
import THead from "./THead"
import TBody from "./TBody"

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastSelected: null,
    }
  }
  isAllSelected = () => {
    if (this.props.isSelectable) {
      return (
        this.props.selected.size > 0 &&
        this.props.selected.size === this.props.records.length
      )
    }
  }
  toggleRecord = (e, id) => {
    if (this.props.isSelectable) {
      let selected = new Set(this.props.selected)

      if (e.shiftKey) {
        let toggelFunction
        if (selected.has(id)) {
          toggelFunction = Set.prototype.delete.bind(selected)
        } else {
          toggelFunction = Set.prototype.add.bind(selected)
        }
        let last, now
        this.props.records.forEach((element, index) => {
          if (element.id === id) {
            now = index
          }
          if (element.id === this.state.lastSelected) {
            last = index
          }
        })
        if (now < last) {
          const temp = now
          now = last
          last = temp
        }
        for (let i = last; i <= now; i++) {
          toggelFunction(this.props.records[i].id)
        }
      } else {
        selected.delete(id) ? null : selected.add(id)
        this.setState({ lastSelected: id })
      }

      this.props.setSelectedRecords(selected)
    }
  }
  toggleAll = () => {
    if (this.props.isSelectable) {
      let selected = new Set()

      if (this.props.isNotAllSelected) {
        this.props.records.forEach(r => selected.add(r.id))
      }

      this.props.setSelectedRecords(selected)
    }
  }
  getDinamicColsCount(fields) {
    return fields.filter(f => f.maxWidth === "auto").length
  }
  getWidthOfStaticCols(fields) {
    let width = 0

    fields.forEach(f => {
      if (f.maxWidth !== "auto") {
        width += Number(f.maxWidth.substr(0, f.maxWidth.length - 2))
      }
    })

    return width
  }
  render() {
    let props = this.props,
      dinamicColsCount = this.getDinamicColsCount(props.fields),
      widthOfStaticCols = this.getWidthOfStaticCols(props.fields)

    return (
      <section className="ldc-table">
        <div className="t-buttons">
          {props.buttons &&
            props.buttons.table &&
            props.buttons.table.map(button => (
              <Button
                key={button.value}
                label={button.value}
                onClick={button.onClick}
                appStyle={true}
                disabled={button.actionPerSelected && !props.selected.size}
              />
            ))}
        </div>
        {props.renderFilters && props.renderFilters()}
        {props.renderResultsHead && props.renderResultsHead()}
        <div className="t-main">
          <THead
            fields={props.fields}
            colCount={dinamicColsCount}
            staticColsWidth={widthOfStaticCols}
            toggleAll={this.toggleAll}
            isAllSelected={!props.isNotAllSelected}
            onSort={props.onSort}
            sortedBy={props.sortedBy}
            isSelectable={props.isSelectable}
          />
          <TBody
            fields={props.fields}
            records={props.records}
            colCount={dinamicColsCount}
            staticColsWidth={widthOfStaticCols}
            toggleRecord={this.toggleRecord}
            selected={props.selected}
            buttons={props.buttons && props.buttons.record}
            showOnZeroRecords={props.showOnZeroRecords}
            isSelectable={props.isSelectable}
          />
        </div>
        <div className="t-footer" />
      </section>
    )
  }
}

export default withInfiniteScroll()(Table)
