import React from "react"
import { connect } from "react-redux"
import Table from "Components/Table"
import { getLeads, setSelectedLeads } from "../../actions"

const buyLeadsConfig = require("./buy_leads_table.config.json")

class Buy extends React.Component {
  constructor(props) {
    super(props)

    getLeads(props.dispatch)
  }
  buyLeads = () => {
    console.log(Array.from(this.props.leads.selected))
  }
  buyLead = id => {
    console.log([id])
  }
  onScrollBottom = cb => {
    let { dispatch, leads } = this.props

    getLeads(dispatch, cb, leads.page + 1)
  }
  getButtons = () => {
    return {
      table: [
        {
          value: "buy ${number} leads",
          onClick: this.buyLeads
        }
      ],
      record: [
        {
          value: "buy",
          onClick: this.buyLead
        }
      ]
    }
  }
  setSelectedRecords = selectedLeads => {
    this.props.dispatch(setSelectedLeads(selectedLeads))
  }
  render() {
    return (
      <Table
        title="Buy Leads"
        fields={buyLeadsConfig.fields}
        records={this.props.leads.list}
        buttons={this.getButtons()}
        setSelectedRecords={this.setSelectedRecords}
        onScrollBottom={this.onScrollBottom}
        selected={this.props.leads.selected}
      />
    )
  }
}

const mapStateToProps = state => ({
  leads: state.leads
})

export default connect(mapStateToProps)(Buy)
