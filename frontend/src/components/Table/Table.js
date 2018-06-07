import React from "react";
import withInfiniteScroll from "HOC/withInfiniteScroll";
import Button from "Components/Button";
import THead from "./THead";
import TBody from "./TBody";

class Table extends React.Component {
  isAllSelected = () => {
    return this.props.selected.size > 0 && this.props.selected.size === this.props.records.length;
  };
  toggleRecord = id => {
    let selected = new Set(this.props.selected);

    selected.delete(id) ? null : selected.add(id);

    this.props.setSelectedRecords(selected);
  };
  toggleAll = () => {
    let selected = new Set();

    if (!this.isAllSelected()) {
      this.props.records.forEach(r => selected.add(r.id));
    }

    this.props.setSelectedRecords(selected);
  };
  getDinamicColsCount(fields) {
    return fields.filter(f => f.maxWidth === "auto").length;
  }
  getWidthOfStaticCols(fields) {
    let width = 0;

    fields.forEach(f => {
      if (f.maxWidth !== "auto") {
        width += Number(f.maxWidth.substr(0, f.maxWidth.length - 2));
      }
    });

    return width;
  }
  render() {
    let props = this.props,
      dinamicColsCount = this.getDinamicColsCount(props.fields),
      widthOfStaticCols = this.getWidthOfStaticCols(props.fields);

    return (
      <section className="ldc-table">
        {props.title ? <h1>{props.title}</h1> : null}
        {props.buttons.table.map(button => (
          <Button
            key={button.value}
            label={button.value}
            onClick={button.onClick}
            disabled={!props.selected.size}
          />
        ))}
        <THead
          fields={props.fields}
          colCount={dinamicColsCount}
          staticColsWidth={widthOfStaticCols}
          toggleAll={this.toggleAll}
          isAllSelected={this.isAllSelected()}
          onSort={props.onSort}
          sortedBy={props.sortedBy}
        />
        {
          <TBody
            fields={props.fields}
            records={props.records}
            colCount={dinamicColsCount}
            staticColsWidth={widthOfStaticCols}
            toggleRecord={this.toggleRecord}
            selected={props.selected}
            buttons={props.buttons.record}
            showOnZeroRecords={props.showOnZeroRecords}
          />
        }
        <div className="t-footer" />
      </section>
    );
  }
}

export default withInfiniteScroll()(Table);
