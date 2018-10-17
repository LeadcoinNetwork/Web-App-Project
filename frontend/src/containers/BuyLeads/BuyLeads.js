import React from "react"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import { leads, industry } from "../../actions"
import LeadsTemplate from "../LeadsTemplate"
import IndustryFilters from "../../components/IndustryFilters"
import Select from "../../components/Select"
import TextField from "../../components/TextField"
import Button from "../../components/Button"
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
    } = this.props
    return (
      // do not change classnames, it's connected to the manual
      <section className="buy_leads">
        <h1>{t("Buy Leads")}</h1>
        <h3>{t("Purchase hot leads for your business.")}</h3>
        <div className="bl-filters">
          <Select
            className="industry"
            value={filter.industry}
            onChange={e => {
              this.props.industryUpdate(e.target.value)
            }}
          >
            <option value="">{t("Choose Industry")}</option>
            <option value="Real Estate">{t("Real Estate")}</option>
            <option value="Design">{t("Design")}</option>
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
          {filter.industryFilters &&
            filter.industryFilters[0].name === "Category" && (
              <Select
                className="category"
                value={filter.industryFilters[0].value}
                onChange={e => {
                  const industryFilters = filter.industryFilters
                  industryFilters[0].value = e.target.value
                  handleFilter({
                    ...filter,
                    industryFilters,
                  })
                }}
              >
                {
                  <option key="0" value="">
                    {"Choose " + filter.industryFilters[0].name}
                  </option>
                }
                {filter.industryFilters[0].options.map((option, index) => (
                  <option key={index + 1} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            )}
          <TextField
            appStyle
            className="search_bar"
            placeholder={t("Search...")}
            value={filter.search}
            onChange={e => {
              handleFilter({
                ...filter,
                search: e.target.value,
              })
            }}
          />
          <IndustryFilters
            filters={
              filter.industryFilters
                ? filter.industryFilters.slice(1)
                : undefined
            } // first filter is the category filter above
            expand={expandIndustryFilters}
            onExpandClick={expandFiltersClick}
            handleFilter={industryFilters => {
              filter.industryFilters = industryFilters
              handleFilter(filter)
            }}
          />
          <div className="search-button-wrapper">
            <Button
              className="search"
              onClick={() => {
                clearList()
                searchClicked()
                fetchLeads()
              }}
              appStyle={true}
              disabled={!filter.industry}
            >
              {t("Search")}
            </Button>
          </div>
        </div>
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
