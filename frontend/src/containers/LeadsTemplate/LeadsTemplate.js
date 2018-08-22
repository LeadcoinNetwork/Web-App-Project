import React from "react"
import { connect } from "react-redux"
import * as actions from "Actions"
import Table from "Components/Table"
import Button from "Components/Button"
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
  zeroResults = () => {
    switch (this.props.pageName) {
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
      case "buy":
        return (
          <>
            <h3>{t("Sorry, we couldn't find any leads.")}</h3>
            <span>{t("Try expanding your search criteria.")}</span>
          </>
        )
      case "my":
        return (
          <>
            <h3>{t("You have no leads.")}</h3>
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
    let { leads, app, toggleResultsMode, getButtons } = this.props

    return (
      <div className="lt-results-head">
        <h4>Search Results</h4>
        {
          getButtons && getButtons().table.map(button => (
            <Button
              key={button.value}
              label={button.value}
              onClick={button.onClick}
              appStyle={true}
              disabled={button.actionPerSelected && !leads.selected.size}
            />
          ))
        }
        <label className="ltrh-count">
          {leads.list.length} {t("of")} {leads.total} {t("leads")}
        </label>
        <SwitchResultsMode
          cardsMode={app.cardsMode}
          toggleMode={toggleResultsMode}
        />
      </div>
    )
  }
  render() {
    let { pageName, leads, fields, setSelectedLeads, app } = this.props

    let isNotAllSelected = this.isNotAllSelected()

    return (
      <div>
        <div className="ldc-leads-template">
          <section className={`ldc-${pageName}-leads`}>
            {
              leads.list.length || leads.loading ? (
                app.cardsMode ? (
                  <LeadsResults
                    leads={leads}
                    fullyLoaded={leads.fullyLoaded}
                    isSelectable={this.props.getButtons}
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
                        checked={
                          this.props.getButtons && leads.selected.has(lead.id)
                        }
                        isSelectable={this.props.getButtons}
                        buttons={
                          this.props.getButtons && this.props.getButtons().record
                        }
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
                    renderResultsHead={this.renderResultsHead}
                    records={leads.list}
                    fullyLoaded={leads.fullyLoaded}
                    buttons={this.props.getButtons && {table: [], record: this.props.getButtons().record}}
                    setSelectedRecords={setSelectedLeads}
                    isNotAllSelected={isNotAllSelected}
                    selected={leads.selected}
                    isSelectable={this.props.getButtons}
                    pageName={pageName}
                    displayLead={this.props.displayLead}
                  />
                )
              ) : (
                <div className="lt-zero-results">{this.zeroResults()}</div>
              )
            }
          </section>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  app: state.app,
})

const mapDispatchToProps = {
  toggleResultsMode: actions.app.toggleResultsMode,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeadsTemplate)
