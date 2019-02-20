import React from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import { leads } from "../../actions"
import LeadsTemplate from "Containers/LeadsTemplate"
import Select from "Components/Select"
import TextField from "Components/TextField"
import Button from "Components/Button"
import t from "../../utils/translate/translate"

class BuyLeads extends React.Component {
  buyLeads = () => {
    this.props.push("/shopping-cart")
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
      <section className="buy_leads">
        <h1>{t("Buy Leads")}</h1>
        <h3>{t("Purchase hot leads for your business.")}</h3>
        <div className="bl-filters">
          <Select
            className="industry"
            value={this.props.leads.filter.industry}
            onChange={e => {
              const filter = this.props.leads.filter
              this.props.handleFilter({
                ...filter,
                industry: e.target.value,
              })
            }}
          >
            <option value="All">{t("Choose your industry")}</option>
            <option value="Web Building">{t("Web Building")}</option>
            <option value="Real Estate" disabled>
              {t("Real Estate")}
            </option>
            <option value="Crypto" disabled>
              {t("Crypto")}
            </option>
            <option value="Insurance" disabled>
              {t("Insurance")}
            </option>
            <option value="Loans" disabled>
              {t("Loans")}
            </option>
          </Select>
          <TextField
            appStyle
            className="search_bar"
            placeholder={t("Search...")}
            value={this.props.leads.filter.search}
            onChange={e => {
              const filter = this.props.leads.filter
              this.props.handleFilter({
                ...filter,
                search: e.target.value,
              })
            }}
          />
          <Button
            className="search"
            onClick={() => {
              this.props.clearList()
              this.props.searchClicked()
              this.props.fetchLeads()
            }}
            appStyle={true}
          >
            {t("Search")}
          </Button>
        </div>
        {this.props.leads.searchClicked && (
          <LeadsTemplate
            {...this.props}
            pageName="buy"
            constantCardOpen={false}
            isSelectable={true}
            getButtons={this.getButtons}
          />
        )}
      </section>
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
    handleFilter: newFilter => leads.filterChange("BUY_LEADS", newFilter),
    fetchLeads: params => leads.fetchLeads("BUY_LEADS", params),
    setSelectedLeads: selectedLeads =>
      leads.setSelectedLeads("BUY_LEADS", selectedLeads),
    toggelCardView: index => leads.toggelCardView("BUY_LEADS", index),
    searchClicked: () => leads.searchClicked("BUY_LEADS"),
    clearList: () => leads.clearList("BUY_LEADS"),
  },
)(BuyLeads)
