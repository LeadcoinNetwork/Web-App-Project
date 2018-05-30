import React from 'react';
import Table from 'Components/Table';


const fields = require('./fields.json');
const records = require('./records.json');

class TableData extends React.Component {
  buyLeads(leads) {
    console.log(leads);
  }
  render() {
    return (
      <Table fields={fields}
             records={records}
             multipleSelectionButton='Buy Selected Leads'
             multipleSelectionAction={this.buyLeads}
             />
    )
  }
}

export default TableData;