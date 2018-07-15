import React from "react"
import Table from "Components/Table"
import LeadsResults from "Components/LeadsResults"
import Select from "Components/Select"
import t from "../../utils/translate/translate"
import RealEstateLead from "Components/RealEstateLead"
import ResultsModeContext from "Containers/App/ResultsModeContext"
import SwitchResultsMode from "Containers/SwitchResultsMode"

class LeadsTemplate extends React.Component {
  onScrollBottom = () => {
    let { fetchLeads, leads } = this.props

    fetchLeads(leads.page + 1)
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
  render() {
    let {
        pageTitle,
        pageClassName,
        leads,
        fields,
        setSelectedLeads,
      } = this.props,
      isNotAllSelected = this.isNotAllSelected()

    return (
      <ResultsModeContext.Consumer>
        {({ cardsMode, toggleMode }) => (
          <div className="ldc-leads-template">
            <section className={pageClassName}>
              <SwitchResultsMode />
              <h1>{t(pageTitle)}</h1>
              {cardsMode ? (
                <LeadsResults
                  leads={leads}
                  buttons={this.props.getListButtons()}
                  isNotAllSelected={isNotAllSelected}
                  loading={leads.loading}
                  onScrollBottom={this.onScrollBottom}
                  toggleAll={this.toggleAll}
                  renderResultsHead={() => (
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
                  )}
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
                  records={leads.list}
                  buttons={this.props.getButtons()}
                  setSelectedRecords={setSelectedLeads}
                  isNotAllSelected={isNotAllSelected}
                  selected={leads.selected}
                  isSelectable={true}
                />
              )}
            </section>
          </div>
        )}
      </ResultsModeContext.Consumer>
    )
  }
}

export default LeadsTemplate
