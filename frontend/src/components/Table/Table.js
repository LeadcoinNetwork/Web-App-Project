import React from "react";
import withInfiniteScroll from "HOC/withInfiniteScroll";
import Button from "Components/Button";
import THead from "./THead";
import TBody from "./TBody";

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRecords: new Set()
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      records: nextProps.records
    });
  }
  isAllSelected = () => {
    return this.state.selectedRecords.size === this.props.records.length;
  };
  toggleRecord = id => {
    let selectedRecords = new Set(this.state.selectedRecords);

    selectedRecords.delete(id) ? null : selectedRecords.add(id);

    this.setState({ selectedRecords });
  };
  toggleAll = () => {
    if (this.state.selectedRecords.size === this.state.records.length) {
      this.setState({ selectedRecords: new Set() });
    } else {
      let selectedRecords = new Set();
      this.state.records.forEach(r => selectedRecords.add(r.id));
      this.setState({ selectedRecords });
    }
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
      state = this.state,
      dinamicColsCount = this.getDinamicColsCount(props.fields),
      widthOfStaticCols = this.getWidthOfStaticCols(props.fields),
      isAllSelected = this.isAllSelected();

    return (
      <section className="ldc-table">
        {props.title ? <h1>{props.title}</h1> : null}
        {props.buttons.table.map(button => (
          <Button
            key={button.value}
            label={button.value}
            onClick={() => button.onClick(Array.from(state.selectedRecords))}
            disabled={!state.selectedRecords.size}
          />
        ))}
        <THead
          fields={props.fields}
          colCount={dinamicColsCount}
          staticColsWidth={widthOfStaticCols}
          toggleAll={this.toggleAll}
          isAllSelected={isAllSelected}
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
            selectedRecords={state.selectedRecords}
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
