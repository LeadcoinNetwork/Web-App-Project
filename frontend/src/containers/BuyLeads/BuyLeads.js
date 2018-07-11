import React from "react"
import { connect } from "react-redux"
import Table from "Components/Table"
import LeadsResults from "Components/LeadsResults"
import { leads } from "Actions"
import t from "../../utils/translate/translate"
import Button from "Components/Button"
import RealEstateLead from "Components/RealEstateLead"
import ResultsModeContext from "Containers/App/ResultsModeContext"
import SwitchResultsMode from "Containers/SwitchResultsMode"

class BuyLeads extends React.Component {
  buyLeads = () => {
    console.log(Array.from(this.props.leads.selected))
  }
  buyLead = id => {
    console.log([id])
  }
  onScrollBottom = () => {
    let { fetchLeads, leads } = this.props

    fetchLeads(leads.page + 1)
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
    let { leads, fields, setSelectedLeads } = this.props,
      isNotAllSelected = this.isNotAllSelected()

    return (
      <ResultsModeContext.Consumer>
        {({ cardsMode, toggleMode }) => (
          <section className="ldc-buy-leads">
            <SwitchResultsMode />
            <h1>{t("Buy Leads")}</h1>
            {cardsMode ? (
              <LeadsResults
                leads={leads}
                buttons={this.getListButtons()}
                isNotAllSelected={isNotAllSelected}
                loading={leads.loading}
                onScrollBottom={this.onScrollBottom}
                toggleAll={this.toggleAll}
                render={lead => (
                  <RealEstateLead
                    key={lead.id}
                    {...lead}
                    checked={leads.selected.has(lead.id)}
                    buttons={this.getLeadButtons()}
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
                buttons={this.getButtons()}
                setSelectedRecords={setSelectedLeads}
                isNotAllSelected={isNotAllSelected}
                selected={leads.selected}
                isSelectable={true}
              />
            )}
          </section>
        )}
      </ResultsModeContext.Consumer>
    )
  }
}

const mapStateToProps = state => ({
  leads: state.buyLeads,
  fields: state.fields.filter(lead => !lead.private),
})

export default connect(mapStateToProps, {
  fetchLeads: (...params) => leads.fetchLeads("BUY_LEADS", ...params),
  setSelectedLeads: selectedLeads =>
    leads.setSelectedLeads("BUY_LEADS", selectedLeads),
})(BuyLeads)
