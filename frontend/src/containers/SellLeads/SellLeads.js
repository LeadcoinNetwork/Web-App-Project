import React from "react"
import { connect } from "react-redux"
import { leads } from "../../actions"
import LeadsTemplate from "../LeadsTemplate"
import t from "../../utils/translate/translate"

class SellLeads extends React.Component {
  sellLeads = () => {
    console.log(Array.from(this.props.leads.selected))
  }
  sellLead = id => {
    console.log([id])
  }
  buildButtonLabel = () => {
    let amount = this.props.leads.selected.size

    if (amount > 1) {
      return t("sell ") + amount + t(" leads")
    } else if (amount === 1) {
      return t("sell lead")
    } else {
      return t("sell leads")
    }
  }
  getListButtons = () => {
    return [
      {
        value: this.buildButtonLabel(),
        onClick: this.buyLeads,
        actionPerSelected: true,
      },
    ]
  }
  getLeadButtons = () => {
    return [
      {
        value: t("sell"),
        onClick: this.buyLead,
      },
    ]
  }
  getButtons = amountSelected => {
    return {
      table: this.getListButtons(),
      record: this.getLeadButtons(),
    }
  }
  setSelectedRecords = selectedLeads => {
    this.props.dispatch(leads.setSelectedLeads(selectedLeads))
  }
  render() {
    return (
      <LeadsTemplate
        {...this.props}
        pageName="sell"
        getListButtons={this.getListButtons}
        getLeadButtons={this.getLeadButtons}
        getButtons={this.getButtons}
      />
    )
  }
}

const mapStateToProps = state => ({
  leads: state.sellLeads,
  fields: state.fields,
})

export default connect(mapStateToProps, {
  fetchLeads: (...params) => leads.fetchLeads("SELL_LEADS", ...params),
  setSelectedLeads: selectedLeads =>
    leads.setSelectedLeads("SELL_LEADS", selectedLeads),
})(SellLeads)
