import React from 'react';
import Table from 'Components/Table';

class TableData extends React.Component {
  buyLeads(leads) {
    console.log(leads);
  }
  render() {
    return (
      <Table multipleSelectionButton='Buy Selected Leads' multipleSelectionAction={this.buyLeads} />
    )
  }
}

export default TableData;