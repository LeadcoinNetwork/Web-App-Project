import React from "react"
import { connect } from "react-redux"
import t from "../../utils/translate/translate"
import LeadsTemplate from "../leadsTemplate"
import { leads, moveToSell } from "../../actions"

class MyLeads extends React.Component {
  moveLeadsToSell = () => {
    this.props.moveToSell()
  }
  moveLeadToSell = id => {
    let selected = new Set(this.props.leads.selected)
    selected.add(id)
    this.props.setSelectedLeads(selected)
    this.moveLeadsToSell()
  }
  buildButtonLabel = () => {
    let amount = this.props.leads.selected.size

    if (amount > 1) {
      return t("move ") + amount + t(" leads to sell")
    } else if (amount === 1) {
      return t("move lead to sell")
    } else {
      return t("move leads to sell")
    }
  }
  getListButtons = () => {
    return [
      {
        value: this.buildButtonLabel(),
        onClick: this.moveLeadsToSell,
        actionPerSelected: true,
      },
    ]
  }
  getLeadButtons = () => {
    return [
      {
        value: t("move to sell"),
        onClick: this.moveLeadToSell,
      },
    ]
  }
  getButtons = () => {
    return {
      table: this.getListButtons(),
      record: this.getLeadButtons(),
    }
  }
  render() {
    return (
      <LeadsTemplate
        {...this.props}
        pageName="my"
        getListButtons={this.getListButtons}
        getLeadButtons={this.getLeadButtons}
        getButtons={this.getButtons}
      />
    )
  }
}

const mapStateToProps = state => ({
  leads: state.myLeads,
  fields: state.fields,
})

export default connect(mapStateToProps, {
  fetchLeads: (...params) => leads.fetchLeads("MY_LEADS", ...params),
  setSelectedLeads: selectedLeads =>
    leads.setSelectedLeads("MY_LEADS", selectedLeads),
  moveToSell: moveToSell.myLeadsMoveToSellBegin,
})(MyLeads)
