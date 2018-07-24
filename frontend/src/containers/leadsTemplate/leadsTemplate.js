import React from "react"
import Table from "../../components/table"
import LeadsResults from "../../components/leadsResults"
import Select from "../../components/select"
import TextField from "../../components/textField"
import t from "../../utils/translate/translate"
import RealEstateLead from "../../components/realEstateLead"
import ResultsModeContext from "../app/resultsModeContext"
import SwitchResultsMode from "../switchResultsMode"
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
            <h3>Sorry, we couldn't find any leads</h3>
            <span>Try expanding your criteria</span>
          </>
        )
      case "sell":
        return (
          <>
            <h3>Start uploading your leads</h3>
            <span>
              Upload your leads now by selecting a{" "}
              <Link to="/csv-upload">CSV file</Link> or by filling out a{" "}
              <Link to="/add-lead">simple web form</Link>
            </span>
          </>
        )
      case "my":
        return (
          <>
            <h3>You have no leads</h3>
            <span>
              Explore and <Link to="/buy-leads">buy new leads</Link> now
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
        <Select>
          <option>{t("Sort By")}</option>
          <option>{t("size")}</option>
          <option>{t("budget")}</option>
        </Select>
      </div>
    )
  }
  render() {
    let { pageName, leads, fields, setSelectedLeads } = this.props,
      isNotAllSelected = this.isNotAllSelected()

    return (
      <ResultsModeContext.Consumer>
        {({ cardsMode, toggleMode }) => (
          <div className="ldc-leads-template">
            <section className={`ldc-${pageName}-leads`}>
              <SwitchResultsMode />
              <h1>{t(`${pageName} leads`)}</h1>
              {pageName === "sell" && (
                <div className="lt-links">
                  <Link to="/csv-upload">Upload CSV File</Link>
                  <Link to="/add-lead">Create New Lead</Link>
                </div>
              )}
              {cardsMode ? (
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
              ) : (
                <Table
                  fields={fields.map(field => ({
                    ...field,
                    name: t(field.name),
                  }))}
                  loading={leads.loading}
                  onScrollBottom={this.onScrollBottom}
                  renderFilters={this.renderFilters}
                  renderResultsHead={this.renderResultsHead}
                  records={leads.list}
                  buttons={this.props.getButtons()}
                  setSelectedRecords={setSelectedLeads}
                  isNotAllSelected={isNotAllSelected}
                  selected={leads.selected}
                  isSelectable={true}
                />
              )}
              {!leads.list.length &&
                !leads.loading && (
                  <div className="lt-zero-results">{this.zeroResults()}</div>
                )}
            </section>
          </div>
        )}
      </ResultsModeContext.Consumer>
    )
  }
}

export default LeadsTemplate
