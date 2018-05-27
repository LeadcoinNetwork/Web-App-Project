import './style.css';

import * as React from 'react';
import Checkbox from '../leadcoin_ui/Checkbox';

const fields = require('./fields.json');
const records = require('./records.json');

const dinamicColsCount = (fields:any) => (
  fields.filter((f:any) => (
    f.maxWidth === 'auto')
  ).length
);

const widthOfStaticCols = (fields:any) => {
  let width = 0;

  fields.forEach((f:any) => {
    if (f.maxWidth !== 'auto') {
      width += Number(f.maxWidth.substr(0, f.maxWidth.length - 2));
    }
  })

  return width;
};

export interface IField {
  name:string;
  key:string;
  sortable:boolean;
  editable:boolean;
  maxWidth?:string;
  minWidth?:string;
}

export interface ITable {
  selectable?:boolean;
  fields?:IField[];
  records?:any[];
}

class Table extends React.Component <ITable> {
  constructor(props:ITable) {
    super(props);

    this.state = {
      selectable: true,
      fields: fields,
      records: records,
    };
  }
  render() {
    return (
      <section className='ldc-table' >
        <THead fields={fields} colCount={dinamicColsCount(fields)} staticColsWidth={widthOfStaticCols(fields)} />
        <TBody fields={fields} records={records} colCount={dinamicColsCount(fields)} staticColsWidth={widthOfStaticCols(fields)} />
        <div className='t-footer'></div>
      </section>

    );
  }
}

const THead = (props:any) => (
  <div className='t-head'>
    <THRow {...props} />
  </div>
);

const THRow = (props:any) => (
  <div className='th-row'>
    {
      props.fields.map((f:any) => (
        <THRCol key={f.name} colCount={props.colCount} staticColsWidth={props.staticColsWidth} field={f} />
      ))
    }
  </div>
)

const THRCol = ({
  field,
  colCount,
  staticColsWidth,
}:any) => (
  <div key={field.name} className='thr-col' style={{
    width: `calc((100% - ${staticColsWidth}px) / ${colCount})`,
    maxWidth: field.maxWidth,
    minWidth: field.minWidth,
  }}>
    {field.name}
  </div>
);

const TBody = (props:any) => (
  <div className='t-body'>
    {
      props.records.map((r:any) => (
        <TBRow key={r.id} {...r} {...props} />
      ))
    }
  </div>
);

const TBRow = (props:any) => (
  <div className='tb-row'>
    <div className='tbr-checkbox'>
      <Checkbox checked={false} onClick={() => console.log(props.id)} />
    </div>
    {
      props.fields.map((f:any) => (
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
}:any) => (
  <div className='tbr-col' style={{
    width: `calc((100% - ${staticColsWidth}px) / ${colCount})`,
    maxWidth: field.maxWidth,
    minWidth: field.minWidth,
  }}>
    {value}
  </div>
)

export default Table;