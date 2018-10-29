import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { leads, industry } from "../../actions"
import LeadsTemplate from "../LeadsTemplate"
import SearchFilterBar from "../../components/SearchFilterBar"
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
  getButtons = () => {
    return {
      table: this.getListButtons(),
      record: this.getLeadButtons(),
    }
  }
  setSelectedRecords = selectedLeads => {
    this.props.dispatch(leads.setSelectedLeads(selectedLeads))
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
      <>
        <div style={{ float: "left" }}>
          <h1>{t("Sell Leads")}</h1>
        </div>
        <div style={{ float: "right" }}>
          <div className="upload-links">
            <Link
              to="/salesforce-upload"
              className="salesforce-upload no-underline"
            >
              {t("Upload from Salesforce")}
            </Link>
            <Link to="/csv-upload" className="csv-upload no-underline">
              {t("Upload CSV File")}
            </Link>
            <Link to="/add-lead" className="add-lead no-underline">
              {t("Upload a Single Lead")}
            </Link>
          </div>
        </div>
        <br style={{ clear: "both" }} />
        <h3>
          {t("Earn money by selling your unused leads to other professionals.")}
        </h3>
        <SearchFilterBar
          className="sl-filters"
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
              pageName="sell"
              constantCardOpen={true}
              isSelectable={false}
            />
          )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  leads: state.sellLeads,
  fields: state.fields.public,
})

export default connect(
  mapStateToProps,
  {
    handleFilter: newFilter => leads.filterChange("SELL_LEADS", newFilter),
    industryUpdate: industry.industryUpdate,
    fetchLeads: (...params) => leads.fetchLeads("SELL_LEADS", ...params),
    setSelectedLeads: selectedLeads =>
      leads.setSelectedLeads("SELL_LEADS", selectedLeads),

    toggelCardView: index => leads.toggelCardView("SELL_LEADS", index),
    searchClicked: () => leads.searchClicked("SELL_LEADS"),
    expandFiltersClick: () => leads.expandFiltersClick("SELL_LEADS"),
    clearList: () => leads.clearList("SELL_LEADS"),
  },
)(SellLeads)
