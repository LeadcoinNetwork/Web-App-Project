import React from "react"
import { connect } from "react-redux"
import { leads } from "Actions"
import { push } from "react-router-redux"
import LeadsTemplate from "Containers/LeadsTemplate"
import t from "../../utils/translate/translate"

class BuyLeads extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
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
      // do not change classnames, it's connected to the manual
      <>
        <h1>{t("Buy Leads")}</h1>
        <h3>{t("Purchase hot leads for your business now!")}</h3>
        <select className="industry">
          <option />
          <option>{t("Real Estate")}</option>
          <option disabled>{t("Crypto")}</option>
          <option disabled>{t("Insurance")}</option>
          <option disabled>{t("Loans")}</option>
        </select>
        <select className="category">
          <option />
          <option>{t("Real Estate-Buy")}</option>
          <option disabled>{t("Real Estate-Sell")}</option>
          <option disabled>{t("Real Estate-Looking to rent")}</option>
          <option disabled>{t("Real Estate-Properties for rent")}</option>
        </select>
        <button
          className="search"
          onClick={() => {
            this.setState({ showOnlyAfterSearch: true })
          }}
        >
          {t("Search")}
        </button>
        {this.state.showOnlyAfterSearch && (
          <LeadsTemplate
            {...this.props}
            pageName="buy"
            getButtons={this.getButtons}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  leads: state.buyLeads,
  fields: state.fields.filter(lead => !lead.private),
})

export default connect(
  mapStateToProps,
  {
    push: push,
    fetchLeads: params => leads.fetchLeads("BUY_LEADS", params),
    setSelectedLeads: selectedLeads =>
      leads.setSelectedLeads("BUY_LEADS", selectedLeads),
  },
)(BuyLeads)
