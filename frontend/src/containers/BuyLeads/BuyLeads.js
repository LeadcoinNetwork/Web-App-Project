import React from "react"
import { connect } from "react-redux"
import { leads } from "../../actions"
import { push } from "react-router-redux"
import LeadsTemplate from "Containers/LeadsTemplate"
import t from "../../utils/translate/translate"

class BuyLeads extends React.Component {
  buyLeads = () => {
    this.props.push("/checkout")
  }
  buyLead = id => {
    let selected = new Set(this.props.leads.selected)
    selected.add(id)
    this.props.setSelectedLeads(selected)
    this.buyLeads()
  }
  buildButtonLabel = () => {
    let amount = this.props.leads.selected.size

    if (amount > 1) {
      return t("buy ") + amount + t(" leads")
    } else if (amount === 1) {
      return t("buy lead")
    } else {
      return t("buy leads")
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
        value: t("buy"),
        onClick: this.buyLead,
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
        pageName="buy"
        getListButtons={this.getListButtons}
        getLeadButtons={this.getLeadButtons}
        getButtons={this.getButtons}
      />
    )
  }
}

const mapStateToProps = state => ({
  leads: state.buyLeads,
  fields: state.fields.filter(lead => !lead.private),
})

export default connect(mapStateToProps, {
  push: push,
  fetchLeads: params => leads.fetchLeads("BUY_LEADS", params),
  setSelectedLeads: selectedLeads =>
    leads.setSelectedLeads("BUY_LEADS", selectedLeads),
})(BuyLeads)
