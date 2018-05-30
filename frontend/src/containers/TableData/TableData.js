import React from 'react';
import Table from 'Components/Table';


const fields = require('./fields.json');
const records = require('./records.json');

class TableData extends React.Component {
  constructor() {
    super();

    this.state = {
      fields: fields,
      records: records
    }
  }
  buyLeads = leads => {
    console.log(leads);
  }
  buyLead = lead => {
    this.buyLeads([lead]);
  }
  render() {
    let state = this.state;

    return (
      <Table fields={state.fields}
             records={state.records}
             multipleSelectionButton='Buy Selected Leads'
             multipleSelectionAction={this.buyLeads}
             recordMainAction={this.buyLead}
             />
    )
  }
}

export default TableData;