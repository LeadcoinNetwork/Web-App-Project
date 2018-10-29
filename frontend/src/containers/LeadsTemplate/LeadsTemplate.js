import React from "react"
import { connect } from "react-redux"
import * as actions from "Actions"
import Table from "../../components/Table"
import Button from "../../components/Button"
import LeadsResults from "../../components/LeadsResults"
import t from "../../utils/translate/translate"
import CardView from "../../components/CardView"
import SwitchResultsMode from "../../containers/SwitchResultsMode"
import { Link } from "react-router-dom"
import { push } from "react-router-redux"

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
    const { loading } = this.props.leads
    console.log({ loading })
    if (loading) {
      return (
        <>
          <div className="ajax-loader2" />
        </>
      )
    }
    switch (this.props.pageName) {
      case "sell":
        return (
          <>
            <h3>{t("Start uploading your leads")}</h3>
            <span>
              {t("Upload your leads now by selecting a ")}
              <Link to="/csv-upload">{t("CSV file")}</Link>
              {t(" or by filling out a ")}
              <Link to="/add-lead">{t("simple web form")}</Link>
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
              {t("Explore and ")}
              <Link to="/buy-leads">{t("buy new leads")}</Link>
              {t(" now")}
            </span>
          </>
        )
    }
  }
  renderResultsHead = isSearchResults => {
    let {
      pageName,
      leads,
      app,
      toggleResultsMode,
      isSelectable,
      getButtons,
    } = this.props
    return (
      <div
        className={`lt-results-head
        ${isSearchResults ? " is-search-results" : " not-search-results"}
      `}
      >
        {isSearchResults && <h4>{t("Search Results")}</h4>}
        {isSelectable &&
          getButtons &&
          getButtons().table.map(button => (
            <Button
              key={button.value}
              label={button.value}
              onClick={button.onClick}
              appStyle={true}
              disabled={!leads.selected.size}
            />
          ))}
        {/* <label className="ltrh-count">
          {leads.list.length} {t("of")} {leads.total} {t("leads")}
        </label> */}
        {
          <SwitchResultsMode
            cardsMode={app.cardsMode}
            toggleMode={toggleResultsMode}
          />
        }
      </div>
    )
  }
  render() {
    let {
      pageName,
      leads,
      fields,
      setSelectedLeads,
      app,
      getButtons,
      isSelectable,
      constantCardOpen,
      displayLead,
      deleteLead,
      editLead,
    } = this.props
    let isNotAllSelected = this.isNotAllSelected()
    return (
      <div>
        <div
          className={`ldc-leads-template${isSelectable ? " selectable" : ""}`}
        >
          <section className={`ldc-${pageName}-leads`}>
            {leads.list.length ? (
              app.cardsMode ? (
                <LeadsResults
                  leads={leads}
                  fullyLoaded={leads.fullyLoaded}
                  isSelectable={isSelectable}
                  isNotAllSelected={isNotAllSelected}
                  isSearchResults={pageName === "buy" ? true : false}
                  loading={leads.loading}
                  onScrollBottom={this.onScrollBottom}
                  toggleAll={this.toggleAll}
                  renderFilters={this.renderFilters}
                  renderResultsHead={this.renderResultsHead}
                  renderLead={(lead, index) => (
                    <CardView
                      industry={leads.filter.industry}
                      key={lead.id}
                      {...lead}
                      fields={fields}
                      checked={isSelectable && leads.selected.has(lead.id)}
                      isSelectable={isSelectable}
                      push={this.props.push}
                      buttons={getButtons && getButtons().record}
                      toggleCheck={event => this.toggleLead(event, lead.id)}
                      toggleCardView={() => this.props.toggelCardView(index)}
                      constantCardOpen={constantCardOpen}
                      deleteLead={deleteLead}
                      editLead={editLead}
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
                  buttons={
                    getButtons && {
                      table: [],
                      record: getButtons().record,
                    }
                  }
                  setSelectedRecords={setSelectedLeads}
                  isNotAllSelected={isNotAllSelected}
                  selected={leads.selected}
                  isSelectable={isSelectable}
                  isSearchResults={pageName === "buy" ? true : false}
                  editLead={editLead}
                  displayLead={displayLead}
                />
              )
            ) : (
              <div className="lt-zero-results">{this.zeroResults()}</div>
            )}
            {isSelectable &&
              getButtons && (
                <div className="mobileOnly downStrip">
                  <Button
                    className={pageName + "Leads"}
                    label={getButtons().table[0].value}
                    onClick={getButtons().table[0].onClick}
                    appStyle={true}
                    disabled={!leads.selected.size}
                  />
                </div>
              )}
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
  push,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeadsTemplate)
