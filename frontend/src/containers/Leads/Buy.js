import React from "react";
import { connect } from "react-redux";
import Table from "Components/Table";
import { getLeads } from "../../actions";

const buyLeadsConfig = require("./buy_leads_table.config.json");

class Buy extends React.Component {
  constructor(props) {
    super(props);

    getLeads(props.dispatch);
  }
  buyLeads = leads => {
    console.log(leads);
  };
  buyLead = lead => {
    this.buyLeads([lead]);
  };
  onScrollBottom = cb => {
    let { dispatch, leads } = this.props;

    getLeads(dispatch, cb, leads.page + 1);
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
    return (
      <Table
        title="Buy Leads"
        fields={buyLeadsConfig.fields}
        records={this.props.leads.list}
        buttons={this.getButtons()}
        onScrollBottom={this.onScrollBottom}
      />
    );
  }
}

const mapStateToProps = state => ({
  leads: state.leads
});

export default connect(mapStateToProps)(Buy);
