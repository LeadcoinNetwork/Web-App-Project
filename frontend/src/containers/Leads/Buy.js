import React from "react";
import { connect } from "react-redux";
import Table from "Components/Table";

const buyLeadsConfig = require("./buy_leads_table.config.json");

class Buy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      records: props.leads
    };
  }
  buyLeads = leads => {
    console.log(leads);
  };
  buyLead = lead => {
    this.buyLeads([lead]);
  };
  onScrollBottom = cb => {
    let leads = this.state.records;

    if (leads.length < 70) {
      setTimeout(() => {
        this.setState({
          records: [...leads, ...leads]
        });
        cb();
      }, 1000);
    }
  };
  getButtons = () => {
    return {
      table: [
        {
          value: "buy selected leads",
          onClick: this.buyLeads
        }
      ],
      record: [
        {
          value: "buy",
          onClick: this.buyLead
        }
      ]
    };
  };
  render() {
    let state = this.state;

    return (
      <Table
        title="Buy Leads"
        fields={buyLeadsConfig.fields}
        records={state.records}
        buttons={this.getButtons()}
        multipleSelectionButton="Buy Selected Leads"
        multipleSelectionAction={this.buyLeads}
        recordMainButton="Buy"
        recordMainAction={this.buyLead}
        onScrollBottom={this.onScrollBottom}
      />
    );
  }
}

const mapStateToProps = state => ({
  leads: state.leads
});

export default connect(mapStateToProps)(Buy);
