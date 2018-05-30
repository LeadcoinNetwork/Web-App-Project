import React from 'react'
import Checkbox from 'Components/Checkbox';
import Button from 'Components/Button';

const fields = require('./fields.json');
const records = require('./records.json');

const dinamicColsCount = fields => (
  fields.filter(f => (
    f.maxWidth === 'auto')
  ).length
);

const widthOfStaticCols = fields => {
  let width = 0;

  fields.forEach(f => {
    if (f.maxWidth !== 'auto') {
      width += Number(f.maxWidth.substr(0, f.maxWidth.length - 2));
    }
  })

  return width;
};

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectable: true,
      fields: fields,
      records: records,
      selectedRecords: new Set(),
    };
  }
  toggleRecord = (id) => {
    let selectedRecords = new Set(this.state.selectedRecords);

    selectedRecords.delete(id) ? null : selectedRecords.add(id);

    this.setState({ selectedRecords });
  }
  render() {
    return (
      <section className='ldc-table' >
        {
          this.props.multipleSelectionButton ? (
            <Button label={this.props.multipleSelectionButton}
                    onClick={() => this.props.multipleSelectionAction(Array.from(this.state.selectedRecords))}
                    />
          ) : null
        }
        <THead fields={fields}
               colCount={dinamicColsCount(fields)}
               staticColsWidth={widthOfStaticCols(fields)}
               />
        <TBody fields={fields}
               records={records}
               colCount={dinamicColsCount(fields)}
               staticColsWidth={widthOfStaticCols(fields)}
               toggleRecord={this.toggleRecord}
               selectedRecords={this.state.selectedRecords}
               />
        <div className='t-footer'></div>
      </section>

    );
  }
}

const THead = props => (
  <div className='t-head'>
    <THRow {...props} />
  </div>
);

const THRow = props => (
  <div className='th-row'>
    {
      props.fields.map(f => (
        <THRCol key={f.name}
                colCount={props.colCount}
                staticColsWidth={props.staticColsWidth}
                field={f}
                />
      ))
    }
  </div>
)

const THRCol = ({
  field,
  colCount,
  staticColsWidth,
}) => (
    <div key={field.name}
         className='thr-col'
         style={{
           width: `calc((100% - ${staticColsWidth}px) / ${colCount})`,
           maxWidth: field.maxWidth,
           minWidth: field.minWidth,
           }}>
      {field.name}
    </div>
  );

const TBody = props => (
  <div className='t-body'>
    {
      props.records.map(r => (
        <TBRow key={r.id} {...r} {...props} />
      ))
    }
  </div>
);

const TBRow = props => (
  <div className='tb-row'>
    <div className='tbr-checkbox'>
      <Checkbox checked={props.selectedRecords.has(props.id)} onClick={() => props.toggleRecord(props.id)} />
    </div>
    {
      props.fields.map(f => (
        <TRCol key={f.key} colCount={props.colCount} staticColsWidth={props.staticColsWidth} field={f} value={props[f.key]} />
      ))
    }
  </div>
);

const TRCol = ({
  field,
  value,
  colCount,
  staticColsWidth,
}) => (
    <div className='tbr-col' style={{
      width: `calc((100% - ${staticColsWidth}px) / ${colCount})`,
      maxWidth: field.maxWidth,
      minWidth: field.minWidth,
    }}>
      {value}
    </div>
  )

export default Table;
