import React from "react"
import { connect } from "react-redux"
import t from "utils/translate/translate"
import LeadsTemplate from "../LeadsTemplate"
import { leads, moveToSell } from "Actions"
import displayLead from "../../actions/displayLead"
import { push } from "react-router-redux"
import DisplayLead from "../DisplayLead"
import ConfirmationDialog from "../../components/ConfirmationDialog"

class MyLeads extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirmation: false,
      isDisplayingLead: false,
    }
  }
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
        onClick: () => this.setState({ showConfirmation: true }),
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
  displayLead = lead => {
    this.props.displayLead(lead)
    this.setState({ isDisplayingLead: true })
    return
    //this.props.push("/display-lead")
  }

  editLead = lead => {
    this.props.push("/edit-lead-" + lead.id)
    return
  }

  render() {
    const isDisplayingLead = this.state ? this.state.isDisplayingLead : false
    return (
      <>
        <h1>{t("My Leads")}</h1>
        <h3>{t("Manage all of your leads from one dashboard.")}</h3>
        {isDisplayingLead && (
          <DisplayLead
            noheader
            backFunction={() => {
              this.setState({ isDisplayingLead: false })
            }}
          />
        )}
        {!isDisplayingLead && (
          <LeadsTemplate
            {...this.props}
            pageName="my"
            constantCardOpen={true}
            isSelectable={true}
            getButtons={this.getButtons}
            editLead={this.editLead.bind(this)}
            displayLead={this.displayLead.bind(this)}
          />
        )}
        {this.state.showConfirmation && (
          <ConfirmationDialog
            description="You are about to move the selected leads to be publicly traded. Are you sure you want to proceed?"
            onConfirm={() => {
              this.setState({ showConfirmation: false })
              this.moveLeadsToSell()
            }}
            onDismiss={() => this.setState({ showConfirmation: false })}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  leads: state.myLeads,
  fields: state.fields.filter(f => {
    return f.key != "lead_price"
  }),
})

export default connect(
  mapStateToProps,
  {
    fetchLeads: (...params) => leads.fetchLeads("MY_LEADS", ...params),
    setSelectedLeads: selectedLeads =>
      leads.setSelectedLeads("MY_LEADS", selectedLeads),
    toggelCardView: index => leads.toggelCardView("MY_LEADS", index),
    moveToSell: moveToSell.myLeadsMoveToSellBegin,
    displayLead: displayLead.displayLeadGet,
    push,
  },
)(MyLeads)
