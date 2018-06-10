import React from "react"
import { connect } from "react-redux"
import Table from "Components/Table"

const fields = require("../../mocks/fields.json")

class Sell extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: fields,
      records: props.leads
    }
  }
  buyLeads = leads => {
    console.log(leads)
  }
  buyLead = lead => {
    this.buyLeads([lead])
  }
  onScrollBottom = cb => {
    let leads = this.state.records

    if (leads.length < 70) {
      setTimeout(() => {
        this.setState({
          records: [...leads, ...leads]
        })
        cb()
      }, 1000)
    }
  }
  render() {
    let state = this.state

    return (
      <Table
        title="Sell Leads"
        fields={state.fields}
        records={state.records}
        multipleSelectionButton="Buy Selected Leads"
        multipleSelectionAction={this.buyLeads}
        recordMainButton="Buy"
        recordMainAction={this.buyLead}
        onScrollBottom={this.onScrollBottom}
      />
    )
  }
}

const mapStateToProps = state => ({
  leads: state.leads
})

export default connect(mapStateToProps)(Sell)
