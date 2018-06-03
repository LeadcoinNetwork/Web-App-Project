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
      records: nextProps.records
    });
  }
  toggleRecord = id => {
    let selectedRecords = new Set(this.state.selectedRecords);

    selectedRecords.delete(id) ? null : selectedRecords.add(id);

    this.setState({ selectedRecords, isAllSelected: false });
  };
  toggleAll = () => {
    this.setState({ isAllSelected: !this.state.isAllSelected });
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
            disabled={!selectedRecords.size && !isAllSelected}
            onClick={() =>
              props.multipleSelectionAction(
                isAllSelected
                  ? records.map(r => r.id)
                  : Array.from(selectedRecords)
              )
            }
          />
        ) : null}
        <THead
          fields={fields}
          colCount={dinamicColsCount}
          staticColsWidth={widthOfStaticCols}
          toggleAll={this.toggleAll}
          isAllSelected={isAllSelected}
        />
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
        <div className="t-footer" />
      </section>
    );
  }
}

export default withInfiniteScroll()(Table);
