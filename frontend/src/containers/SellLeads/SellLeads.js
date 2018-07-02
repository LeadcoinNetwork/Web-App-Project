import React from "react"
import { connect } from "react-redux"
import Table from "Components/Table"
import { leads } from "../../actions"

class Sell extends React.Component {
  constructor(props) {
    super(props)

    leads.getLeads(props.dispatch)
  }
  sellLeads = () => {
    console.log(Array.from(this.props.leads.selected))
  }
  sellLead = id => {
    console.log([id])
  }
  onScrollBottom = cb => {
    let { dispatch, leads } = this.props

    getLeads(dispatch, cb, leads.page + 1)
  }
  buildButtonLabel = amount => {
    if (amount > 1) {
      return "sell " + amount + " leads"
    } else if (amount === 1) {
      return "sell lead"
    } else {
      return "sell leads"
    }
  }
  getButtons = amountSelected => {
    return {
      table: [
        {
          value: this.buildButtonLabel(amountSelected),
          onClick: this.sellLeads,
          actionPerSelected: true,
        },
      ],
      record: [
        {
          value: "sell",
          onClick: this.sellLead,
        },
      ],
    }
  }
  setSelectedRecords = selectedLeads => {
    this.props.dispatch(leads.setSelectedLeads(selectedLeads))
  }
  render() {
    return (
      <Table
        title="Sell Leads"
        fields={this.props.fields}
        records={this.props.leads.list}
        buttons={this.getButtons(this.props.leads.selected.size)}
        setSelectedRecords={this.setSelectedRecords}
        onScrollBottom={this.onScrollBottom}
        selected={this.props.leads.selected}
        isSelectable={true}
      />
    )
  }
}

const mapStateToProps = state => ({
  leads: state.sellLeads,
  fields: state.fields,
})

export default connect(mapStateToProps)(Sell)
