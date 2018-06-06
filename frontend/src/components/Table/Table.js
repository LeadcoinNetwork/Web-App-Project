import React from "react";
import withInfiniteScroll from "HOC/withInfiniteScroll";
import Button from "Components/Button";
import THead from "./THead";
import TBody from "./TBody";

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: props.fields,
      records: props.records,
      selectedRecords: new Set(),
      isAllSelected: false
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      records: nextProps.records,
      isAllSelected:
        this.state.selectedRecords.size === nextProps.records.length
    });
  }
  toggleRecord = (e, id) => {
    let selectedRecords = new Set(this.state.selectedRecords);

    selectedRecords.delete(id) ? null : selectedRecords.add(id);

    this.setState({
      selectedRecords,
      isAllSelected: selectedRecords.size === this.state.records.length
    });
  };
  toggleAll = () => {
    if (this.state.selectedRecords.size === this.state.records.length) {
      this.setState({ selectedRecords: new Set(), isAllSelected: false });
    } else {
      let selectedRecords = new Set();
      this.state.records.forEach(r => selectedRecords.add(r.id));
      this.setState({ selectedRecords, isAllSelected: true });
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
    let { fields, records, selectedRecords, isAllSelected } = this.state;
    let props = this.props;
    let dinamicColsCount = this.getDinamicColsCount(fields);
    let widthOfStaticCols = this.getWidthOfStaticCols(fields);

    return (
      <section className="ldc-table">
        {props.title ? <h1>{props.title}</h1> : null}
        {props.multipleSelectionButton ? (
          <Button
            label={props.multipleSelectionButton}
            disabled={!selectedRecords.size}
            onClick={() =>
              props.multipleSelectionAction(Array.from(selectedRecords))
            }
          />
        ) : null}
        <THead
          fields={fields}
          colCount={dinamicColsCount}
          staticColsWidth={widthOfStaticCols}
          toggleAll={this.toggleAll}
          isAllSelected={isAllSelected}
          onSort={props.onSort}
          sortedBy={props.sortedBy}
        />
        {props.records.length > 0 ? (
          <TBody
            fields={fields}
            records={records}
            colCount={dinamicColsCount}
            staticColsWidth={widthOfStaticCols}
            toggleRecord={this.toggleRecord}
            selectedRecords={selectedRecords}
            recordMainButton={props.recordMainButton}
            recordMainAction={props.recordMainAction}
            isAllSelected={isAllSelected}
          />
        ) : (
          props.showOnZeroRecords
        )}
        <div className="t-footer" />
      </section>
    );
  }
}

export default withInfiniteScroll()(Table);
