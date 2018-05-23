import * as React from 'react';

const fields = require('./fields.json');
const records = require('./records.json');

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
      <section className='ldc-table'>
        <THead fields={fields} />
        <div className='t-body'></div>
        <div className='t-footer'></div>
      </section>

    );
  }
}

const THead = ({
  fields
}:{fields:IField[]}) => (
  <div className='t-head'>
    {
      fields.map((f:any) => (
        <HeadCol key={f.name} name={f.name} />
      ))
    }
  </div>
);

const HeadCol = ({
  name
}:any) => (
  <div>{name}</div>
);

export default Table;