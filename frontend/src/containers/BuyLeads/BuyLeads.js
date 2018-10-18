import React from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import { leads, industry } from "../../actions"
import LeadsTemplate from "../LeadsTemplate"
import SearchFilterBar from "../../components/SearchFilterBar"
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
    let {
      leads: { filter, expandIndustryFilters, wasSearchClicked },
      handleFilter,
      expandFiltersClick,
      clearList,
      searchClicked,
      fetchLeads,
      industryUpdate,
    } = this.props
    return (
      // do not change classnames, it's connected to the manual
      <section className="buy_leads">
        <h1>{t("Buy Leads")}</h1>
        <h3>{t("Purchase hot leads for your business.")}</h3>
        <SearchFilterBar
          className="bl-filters"
          filter={filter}
          handleFilter={handleFilter}
          clearList={clearList}
          searchClicked={searchClicked}
          fetchLeads={fetchLeads}
          expandFiltersClick={expandFiltersClick}
          expandIndustryFilters={expandIndustryFilters}
          industryUpdate={industryUpdate}
        />
        {wasSearchClicked &&
          filter.industry && (
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
  fields: state.fields.public,
})

export default connect(
  mapStateToProps,
  {
    push: push,
    handleFilter: newFilter => leads.filterChange("BUY_LEADS", newFilter),
    industryUpdate: industry.industryUpdate,
    fetchLeads: params => leads.fetchLeads("BUY_LEADS", params),
    setSelectedLeads: selectedLeads =>
      leads.setSelectedLeads("BUY_LEADS", selectedLeads),
    toggelCardView: index => leads.toggelCardView("BUY_LEADS", index),
    searchClicked: () => leads.searchClicked("BUY_LEADS"),
    expandFiltersClick: () => leads.expandFiltersClick("BUY_LEADS"),
    clearList: () => leads.clearList("BUY_LEADS"),
  },
)(BuyLeads)
