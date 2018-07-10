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
  onScrollBottom = cb => {
    let { dispatch, leads } = this.props

    getLeads(dispatch, cb, leads.page + 1)
  }
  buildButtonLabel = amount => {
    if (amount > 1) {
      return t("buy ") + amount + t(" leads")
    } else if (amount === 1) {
      return t("buy lead")
    } else {
      return t("buy leads")
    }
  }
  getButtons = amountSelected => {
    return {
      table: [
        {
          value: this.buildButtonLabel(amountSelected),
          onClick: this.buyLeads,
          actionPerSelected: true,
        },
      ],
      record: [
        {
          value: t("buy"),
          onClick: this.buyLead,
        },
      ],
    }
  }
  toggleLead = (event, id) => {
    if (event.target.tagName !== "BUTTON") {
      let selected = new Set(this.props.leads.selected)

      selected.delete(id) ? null : selected.add(id)
      this.props.setSelectedLeads(selected)
    }
  }
  render() {
    let { leads, fields, setSelectedLeads } = this.props

    return (
      <ResultsModeContext.Consumer>
        {({ cardsMode, toggleMode }) => (
          <section className="ldc-buy-leads">
            <SwitchResultsMode />
            <h1>{t("Buy Leads")}</h1>
            {cardsMode ? (
              <LeadsResults
                leads={leads}
                render={lead => (
                  <RealEstateLead
                    key={lead.id}
                    {...lead}
                    checked={leads.selected.has(lead.id)}
                    toggleCheck={event => this.toggleLead(event, lead.id)}
                    buyLead={this.buyLead}
                  />
                )}
              />
            ) : (
              <Table
                fields={fields.map(field => ({
                  ...field,
                  name: t(field.name),
                }))}
                records={leads.list}
                buttons={this.getButtons(leads.selected.size)}
                setSelectedRecords={setSelectedLeads}
                onScrollBottom={this.onScrollBottom}
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
  setSelectedLeads: selectedLeads =>
    leads.setSelectedLeads("BUY_LEADS", selectedLeads),
})(BuyLeads)
