import React from "react"
import Table from "Components/Table"
import LeadsResults from "Components/LeadsResults"
import Select from "Components/Select"
import TextField from "Components/TextField"
import t from "../../utils/translate/translate"
import RealEstateLead from "Components/RealEstateLead"
import SwitchResultsMode from "Containers/SwitchResultsMode"
import { Link } from "react-router-dom"

class LeadsTemplate extends React.Component {
  onScrollBottom = () => {
    let { fetchLeads, leads } = this.props

    fetchLeads({
      page: Number(leads.page) + 1,
    })
  }
  isNotAllSelected = () => {
    let { leads } = this.props

    return leads.list.length && leads.selected.size !== leads.list.length
  }
  toggleLead = (event, id) => {
    let { leads, setSelectedLeads } = this.props

    if (event.target.tagName !== "BUTTON") {
      let selected = new Set(leads.selected)

      selected.delete(id) ? null : selected.add(id)
      setSelectedLeads(selected)
    }
  }
  toggleAll = () => {
    let { leads, setSelectedLeads } = this.props,
      selected = new Set()

    if (this.isNotAllSelected()) {
      leads.list.forEach(l => selected.add(l.id))
    }

    setSelectedLeads(selected)
  }
  renderFilters = () => {
    if (this.props.pageName !== "buy") return

    return (
      <div className="lt-filters">
        <TextField placeholder={t("Search...")} appStyle />
      </div>
    )
  }
  zeroResults = () => {
    switch (this.props.pageName) {
      case "buy":
        return (
          <>
            <h3>{t("Sorry, we couldn't find any leads")}</h3>
            <span>{t("Try expanding your search criteria")}</span>
          </>
        )
      case "my":
        return (
          <>
            <h3>{t("You have no leads")}</h3>
            <span>
              {t("Explore and ")}{" "}
              <Link to="/buy-leads">{t("buy new leads")}</Link>
              {t(" now")}
            </span>
          </>
        )
    }
  }
  renderResultsHead = () => {
    let { leads } = this.props

    return (
      <div className="lt-results-head">
        <label className="ltrh-count">
          {leads.list.length} {t("of")} {leads.total} {t("leads")}
        </label>
        {/* <Select>
          <option>{t("Sort By")}</option>
          <option>{t("size")}</option>
          <option>{t("budget")}</option>
        </Select> */}
      </div>
    )
  }
  render() {
    let { pageName, leads, fields, setSelectedLeads } = this.props,
      isNotAllSelected = this.isNotAllSelected()

    return (
      <div>
        <div className="ldc-leads-template">
          <section className={`ldc-${pageName}-leads`}>
            {/* <SwitchResultsMode /> */}
            {/* {cardsMode ? (
                <LeadsResults
                  leads={leads}
                  buttons={this.props.getListButtons()}
                  isNotAllSelected={isNotAllSelected}
                  loading={leads.loading}
                  onScrollBottom={this.onScrollBottom}
                  toggleAll={this.toggleAll}
                  renderFilters={this.renderFilters}
                  renderResultsHead={this.renderResultsHead}
                  renderLead={lead => (
                    <RealEstateLead
                      key={lead.id}
                      {...lead}
                      checked={leads.selected.has(lead.id)}
                      buttons={this.props.getLeadButtons()}
                      toggleCheck={event => this.toggleLead(event, lead.id)}
                    />
                  )}
                />
              ) : ( */}
            <Table
              fields={fields.map(field => ({
                ...field,
                name: t(field.name),
              }))}
              loading={leads.loading}
              onScrollBottom={this.onScrollBottom}
              // renderFilters={this.renderFilters}
              renderResultsHead={this.renderResultsHead}
              records={leads.list}
              buttons={this.props.getButtons && this.props.getButtons()}
              setSelectedRecords={setSelectedLeads}
              isNotAllSelected={isNotAllSelected}
              selected={leads.selected}
              isSelectable={this.props.getButtons}
            />
            {/* )} */}
            {!leads.list.length &&
              !leads.loading && (
                <div className="lt-zero-results">{this.zeroResults()}</div>
              )}
          </section>
        </div>
      </div>
    )
  }
}

export default LeadsTemplate
